from uuid import UUID, uuid4
from enum import Enum
from fastapi import FastAPI, Query, UploadFile
from fastapi.datastructures import Default
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse

import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from pydantic import UUID1, UUID4, BaseModel
from typing import Dict, Any

from app.engine.remove_column_accent import remove_column_accent
from app.engine.change_name import change_columns
from app.engine.filter_column_text import filter_column_text
from app.engine.filter_column_number import filter_column_number
from app.engine.text_case import text_case_change
from app.engine.trim_column import trim_column
from app.engine.remove_column import remove_column
from app.engine.export import export_dataframe
from app.engine.remove_nulls import remove_nulls
from app.utils.pagination import pagination
from app.utils.get_file_ext import get_file_ext
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Dataset original --------

df = pd.DataFrame(
    {
        "Nombre": [" René ", "Mónica", "  Héctor", "Ana", "Raúl", None],
        "Categoría": [
            "Electrónico",
            "Hogar",
            "Jardín",
            "Hogar",
            "Electrónico",
            "Hogar",
        ],
        "Cat-trim": [
            "Electrónico        ",
            "            Hogar",
            "       Jardín          ",
            "  Hogar   ",
            "      Electrónico        ",
            " Hogar ",
        ],
        "Monto_USD": [150, 200, 50, 300, 450, 100],
        "ID_Code": ["A1", "B2", "C3", "D4", "E5", "F6"],
    }
)

df_current = df.copy()


# -------- Request model --------


class TransformRequest(BaseModel):
    operation: str
    params: Dict[str, Any] = {}


TRANSFORMATIONS = {
    "remove_accent": remove_column_accent,
    "rename_columns": change_columns,
    "filter_text": filter_column_text,
    "filter_number": filter_column_number,
    "change_case": text_case_change,
    "trim_column": trim_column,
    "remove_column": remove_column,
    "remove_nulls": remove_nulls,
}


# -------- API endpoints --------


@app.get("/")
def dataset():
    return {"dataset": df_current.to_json()}


@app.post("/transform")
def transform(req: TransformRequest):
    global df_current

    operation = req.operation
    params = req.params

    if operation not in TRANSFORMATIONS:
        return {"error": "Operation not supported"}

    func = TRANSFORMATIONS[operation]

    df_current = func(df_current, **params)

    return {"dataset": df_current.to_json()}


@app.post("/reset")
def reset_dataset():
    global df_current
    df_current = df.copy()
    return {"dataset": df_current.to_json()}


class SupportedFileExtension(str, Enum):
    CSV = "csv"


# General class for managing projects data
class Project:
    def __init__(self, name: str, data: pd.DataFrame) -> None:
        self.id = uuid4()
        self.name = name
        self.dataset = data


# In memory store for projects currently in use
store: Dict[UUID, Project] = {
    UUID("fca87242-4ff0-49b3-8c44-8d17c7da18e0"): Project("mockup", df_current)
}


@app.post("/upload", status_code=201)
async def upload_file(file: UploadFile):
    if not file.filename:
        return JSONResponse({"error": "No upload file sent "}, status_code=400)

    ext = get_file_ext(file.filename)

    try:
        ext = SupportedFileExtension(ext)

        df: pd.DataFrame | None = None
        match ext:
            case SupportedFileExtension.CSV:
                df = pd.read_csv(file.file)
                print(df)

        # if df is not None:
        dataset = Project(file.filename, df)
        store[dataset.id] = dataset
        return {"id": dataset.id, "name": dataset.name}

    except ValueError:
        return JSONResponse(
            {
                "error": f"Unsupported file type '{ext}'. Only {[ext.value for ext in SupportedFileExtension]} are supported"
            },
            status_code=415,
        )


@app.get("/export")
def export(format: str = "csv"):
    buffer = export_dataframe(df_current, format)

    media_types = {
        "csv": "text/csv",
        "excel": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "json": "application/json",
    }

    filenames = {"csv": "dataset.csv", "excel": "dataset.xlsx", "json": "dataset.json"}

    return StreamingResponse(
        buffer,
        media_type=media_types[format],
        headers={"Content-Disposition": f"attachment; filename={filenames[format]}"},
    )


# Return all the projects that are currently in memory
@app.get("/all-projects")
def get_all_projects():
    projects = list([id, store[id].name] for id in store)
    return {"data": projects}


# Return a specific project that is currently in memory
@app.get("/project/{project_id}")
def get_project(
    project_id: UUID, page: int = Query(1, ge=1), offset: int = Query(5, ge=1, le=100)
):
    if project_id not in store:
        return JSONResponse(
            {"error": f"Not found project with id {project_id}"}, status_code=404
        )

    total_records = len(store[project_id].dataset)
    start, end, total_pages = pagination(page, offset, total_records)
    df_json = store[project_id].dataset[start:end].to_json(orient="records")

    return {
        "id": project_id,
        "name": store[project_id].name,
        "totalPages": total_pages,
        "dataset": json.loads(df_json),
    }

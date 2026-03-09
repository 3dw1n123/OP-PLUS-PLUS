from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from app.engine.remove_column_accent import remove_column_accent
from app.engine.change_name import change_columns
from app.engine.filter_column_text import filter_column_text
from app.engine.text_case import text_case_change


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
    "change_case": text_case_change,
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
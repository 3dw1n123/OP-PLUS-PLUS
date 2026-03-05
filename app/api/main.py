from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

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


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hi():
    return {"dataset": df.to_json()}

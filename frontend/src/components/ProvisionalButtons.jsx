import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export const ProvisionalButtons = () => {
  const { id, selectedColumns } = useContext(DataContext)
  return (
    <div style={{ marginBottom: "20px" }}>

      <button
        onClick={() =>
          onTransform(id, "remove_accent", {
            columns: selectedColumns
          })
        }
      >
        Remove accents
      </button>


      <button
        onClick={() =>
          onTransform(id, "remove_accent", {
            columns: selectedColumns
          })
        }
      >
        Remove accents
      </button>

      <button
        onClick={() =>
          onTransform("filter_text", {
            column: "Categoría",
            pat: "Hogar",
            mode: "exact_match"
          })
        }
      >
        Filter Hogar
      </button>

      <button
        onClick={() =>
          onTransform("change_case", {
            columns: {
              Nombre: "upper"
            }
          })
        }
      >
        Uppercase name
      </button>

      <button
        onClick={() =>
          onTransform("trim_column", {
            columns: ["Cat-trim"]
          })
        }
      >
        Trim column
      </button>
      <button
        onClick={() =>
          onTransform("remove_column", {
            columns: ["Monto_USD"]
          })
        }
      >
        Remove column
      </button>


      <button
        onClick={() =>
          onTransform(id, "filter_number", {
            column: "prueba",
            mode: "exact_match",
            value: 2
          })
        }
      >
        Filter Number
      </button>

      <button
        onClick={() =>
          onTransform(id, "remove_nulls", {
            columns: ["prueba"]
          })
        }
      >
        Remove nulls
      </button>

    </div >

  )
}

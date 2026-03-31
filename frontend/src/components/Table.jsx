export function Table({ rows, selectedColumns = [], setSelectedColumns }) {

  // 🔹 Skeleton seguro
  if (rows.length === 0) {
    const skeleton = Array(5).fill();

    return (
      <div className="flex px-2 py-4 bg-slate-950 rounded-lg animate-pulse">
        <table className="w-full rounded-lg">
          <thead>
            <tr>
              {skeleton.map((_, i) => (
                <th key={i} className="h-5"></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeleton.map((_, i) => (
              <tr key={i}>
                {skeleton.map((_, j) => (
                  <td key={j} className="h-5"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="text-slate-200 flex px-2 py-4 bg-slate-950 rounded-lg overflow-auto h-96">
      <table className="w-full border-collapse">

        {/* 🔥 HEADER INTERACTIVO */}
        <thead>
          <tr className="text-slate-50">
            {Object.keys(rows[0]).map((key) => (
              <th
                key={key}
                onClick={() => {
                  setSelectedColumns((prev) =>
                    prev.includes(key)
                      ? prev.filter((c) => c !== key) // 🔴 deselecciona
                      : [...prev, key]                // 🟢 selecciona
                  );
                }}
                className={`h-8 cursor-pointer px-2 transition ${
                  selectedColumns.includes(key)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-700"
                }`}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>

        {/* 🔥 BODY */}
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value], i) => (
                <td
                  key={key + i}
                  className={`h-8 px-2 ${
                    selectedColumns.includes(key)
                      ? "bg-blue-500/30"
                      : ""
                  }`}
                >
                  {value === null ? (
                    <span className="text-red-500">NULL</span>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
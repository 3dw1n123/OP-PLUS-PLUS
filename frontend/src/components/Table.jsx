
export function Table({ rows }) {

  if (rows.length === 0) {
    const skeleton = Array(5).fill()
    return (
      <div className="flex px-2 py-4 bg-slate-950 rounded-lg animate-pulse">
        <table className="w-full rounded-lg">
          <thead>
            <tr>
              {
                skeleton.map(_ => (
                  <th className="w-5 h-5"></th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              skeleton.map(_ => (
                <tr>
                  {
                    skeleton.map(_ => (
                      <td className="w-5 h-5"></td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table >
      </div>
    )
  }

  return (
    <div className="text-slate-200 flex px-2 py-4 bg-slate-950 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="text-slate-50 min-w-5 min-h-5">
            {
              Object.keys(rows[0]).map(key => (
                <th>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {
                Object.values(row).map(value => {
                  if (value === null) {
                    return <td className="min-w-5 min-h-5 text-red-500">NULL</td>
                  }
                  return <td>{value}</td>
                })
              }
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

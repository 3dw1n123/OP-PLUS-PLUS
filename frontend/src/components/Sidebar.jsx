export const Sidebar = () => {

  const tabs = ["Transform", "Filter", "Delete", "Create"]
  return (
    <div>
      <h4>Column name</h4>

      <ul className="flex gap-4">
        {
          tabs.map((tab, i) => (
            <li key={`${tab}-${i}`}>{tab}</li>
          ))
        }
      </ul>

    </div>
  )
}

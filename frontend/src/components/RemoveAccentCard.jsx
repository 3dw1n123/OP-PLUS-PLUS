import { useContext } from "react"
import { SidebarCard } from "./SidebarCard"
import { DataContext } from "../context/DataContext"

export const RemoveAccentCard = ({ active, setActive }) => {
  const { id, selectedColumns, onTransform } = useContext(DataContext)
  return (
    <SidebarCard icon="remove-accent" title="Remove accents" desc="Normalize text by removing accents (á → a)" active={active} setActive={setActive}>
      <div className="flex justify-between">
        <button className="text-white font-bold px-4 py-2 rounded-xl bg-slate-900" onClick={() => setActive('')}>Cancel</button>
        <button
          className="bg-pink-400 px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
          onClick={() =>
            onTransform(id, "remove_accent", {
              columns: selectedColumns
            })
          }
        >
          Apply
        </button>
      </div>
    </SidebarCard>
  )
}

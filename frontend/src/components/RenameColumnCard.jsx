import { useRef } from "react";
import { SidebarCard } from "./SidebarCard";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

export const RenameColumnCard = ({ active, setActive }) => {
  const { id, selectedColumns, onTransform } = useContext(DataContext)
  const renameColumn = useRef(null);


  return (
    <SidebarCard icon="edit" title="Rename column" desc="Change the name of the current column" active={active} setActive={setActive}>
      <label className="flex">
        <span className="font-bold min-w-fit mr-2">
          New name:
        </span>
        <input ref={renameColumn} placeholder="New name" type="text" className="w-full text-50 border-b-1 border-slate-50" />
      </label>
      <div className="flex justify-between">
        <button className="text-white font-bold px-4 py-2 rounded-xl bg-slate-900" onClick={() => setActive('')}>Cancel</button>
        <button
          className="bg-pink-400 px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
          onClick={() =>
            onTransform(id, "rename_columns", {
              columns: {
                [selectedColumns[0]]: renameColumn.current.value
              },
            })
          }
        >
          Apply
        </button>
      </div>
    </SidebarCard>

  )
}

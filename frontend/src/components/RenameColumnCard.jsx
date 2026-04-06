import { useRef } from "react";
import { SidebarCard } from "./SidebarCard";

export const RenameColumnCard = ({ id, column, onTransform, active, setActive }) => {

  const renameColumn = useRef(null);


  return (
    <SidebarCard icon="edit" title="Rename column" desc="Change the name of the current column" active={active} setActive={setActive}>
      <label className="flex">
        <span className="font-bold min-w-fit mr-2">
          New name:
        </span>
        <input ref={renameColumn} placeholder="New name" type="text" className="w-full text-slate-950 border-b-1 border-slate-950" />
      </label>
      <div className="flex justify-between">
        <button className="text-white font-bold px-4 py-2 rounded-xl bg-slate-900" onClick={() => setActive('')}>Cancel</button>
        <button
          className="bg-pink-400 px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
          onClick={() =>
            onTransform(id, "rename_columns", {
              columns: {
                [column]: renameColumn.current.value
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

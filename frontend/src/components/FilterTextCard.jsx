import { useRef } from "react";
import { SidebarCard } from "./SidebarCard";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export const FilterTextCard = ({ active, setActive }) => {

  const { id, selectedColumns, onTransform } = useContext(DataContext)

  const pattern = useRef(null);
  const mode = useRef(null)

  return (
    <SidebarCard icon="filter" title="Filter by text" desc="Filter rows based on a pattern" active={active} setActive={setActive}>
      <label className="">
        <span className="mr-3">
          Filter Mode:
        </span>
        <select ref={mode} className="export-select">
          <option value="exact_match">Extact match</option>
          <option value="contains">Contains</option>
          <option value="start_with">Starts with</option>
          <option value="end_with">Ends with</option>
        </select>
      </label>

      <label>
        <span className="mr-3">
          Pattern to filter:
        </span>
        <input ref={pattern} className="export-select" />
      </label>
      <div className="flex justify-between">
        <button className="text-white font-bold px-4 py-2 rounded-xl bg-slate-900 cursor-pointer" onClick={() => setActive('')}>Cancel</button>
        <button
          className="bg-pink-400 px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
          onClick={() =>
            onTransform(id, "filter_text", {
              column: selectedColumns[0],
              pat: pattern.current.value,
              mode: mode.current.value
            })
          }

        >
          Apply
        </button>
      </div>
    </SidebarCard>
  )
}

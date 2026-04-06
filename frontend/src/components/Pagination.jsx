import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export const Pagination = () => {

  const { page, offset, totalPages, onNextPage, onPrevPage, onSetOffset } = useContext(DataContext)

  return (
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <button onClick={onPrevPage}>
          {"<-"}
        </button>
        <div>
          {page}
        </div>
        <div>
          ...
        </div>
        <div>
          {totalPages}
        </div>
        <button onClick={onNextPage}>
          {"->"}
        </button>
      </div>
      <div className="flex gap-5 items-center">
        <label>View:</label>
        <select onChange={(ev) => onSetOffset(ev.target.value)} value={offset}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

  )
}

import { Icon } from "./Icon"

export const Card = ({ icon, title, desc, action }) => {
  return (
    <button className="grid grid-cols-[24px_1fr] gap-x-4 text-left cursor-pointer" onClick={action}>
      <Icon icon={icon} />
      <h5 className="font-bold">{title}</h5>
      <p className="col-start-2">{desc}</p>
    </button>
  )
}

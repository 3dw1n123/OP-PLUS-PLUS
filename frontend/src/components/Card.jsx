import { Icon } from "./Icon"

export const Card = ({ icon, title, desc }) => {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-x-4">
      <Icon icon={icon} />
      <h5 className="font-bold">{title}</h5>
      <p className="col-start-2">{desc}</p>
    </div>
  )
}

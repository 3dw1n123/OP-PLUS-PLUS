import { Card } from "./Card"

export const SidebarCard = ({ icon, title, desc, active, setActive, children }) => {

  const onActive = () => {
    if (active === title) {
      setActive("")
      return
    }
    setActive(title)
  }

  return (
    <div className="max-w-80 bg-blue-400 text-slate-950 p-2 rounded-xl overflow-hidden">
      <Card icon={icon} title={title} desc={desc} action={onActive} />
      <div className={`${active === title ? "max-h-80" : "max-h-0 opacity-0"} duration-200 grid gap-2`}>
        {children}
      </div>
    </div >
  )
}

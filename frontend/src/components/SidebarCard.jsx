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
    <div className="bg-slate-800 text-slate-50 p-2 rounded-xl overflow-hidden flex flex-col">
      <Card icon={icon} title={title} desc={desc} action={onActive} />
      <div className={`${active === title ? "max-h-80 mt-2" : "max-h-0 opacity-0"} duration-200 grid gap-2`}>
        {children}
      </div>
    </div >
  )
}

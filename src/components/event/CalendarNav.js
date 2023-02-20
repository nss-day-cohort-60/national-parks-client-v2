import { MONTHS } from "./Utilities"
import "./Calendar.css"

export const Navigation = ({ date, setDate, setShowingEventForm }) => {
    return (
      <div className="navigation">
        <div className="back" onClick={() => {
            const newDate = new Date(date)
            newDate.setMonth(newDate.getMonth() - 1)
            setDate(newDate)
          }}>
            {"<-"} {MONTHS[date.getMonth() == 0 ? 11 : date.getMonth() - 1]}
        </div>
  
        <div className="monthAndYear">
          {MONTHS[date.getMonth()]} {date.getFullYear()}
          <a href="javascript:;" onClick={() => setShowingEventForm({ visible: true })}>+</a>
        </div>
  
        <div className="forward" onClick={() => {
            const newDate = new Date(date)
            newDate.setMonth(newDate.getMonth() + 1)
            setDate(newDate)
          }}>
            {MONTHS[date.getMonth() == 11 ? 0 : date.getMonth() + 1]} {"->"}
        </div>
      </div>
    )
  }
  
import { Fragment } from "react"
import { toStartOfDay, findEventsForDate, MiniEvent } from "./Utilities"
import "./Calendar.css"

export const Grid = ({ date, events, setViewingEvent, setShowingEventForm, actualDate }) => {
    const ROWS_COUNT = 6
    const currentDate = toStartOfDay(new Date())
  
      // Finds the closest Monday relative to the first day of
    // the target month/year combination
    // Then increment upon this day until we have a full set
    // of date objects to work with
    const startingDate = new Date(date.getFullYear(), date.getMonth(), 1)
    startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1))
  
    const dates = []
    for (let i = 0; i < (ROWS_COUNT * 7); i++) {
      const date = new Date(startingDate)
      dates.push({ date, events: findEventsForDate(events, date) })
      startingDate.setDate(startingDate.getDate() + 1)
    }
  
    return (
      <Fragment>
        {dates.map((date, index) => {
          return (
            <div 
              key={index}
              className={`cell ${date.date.getTime() == currentDate.getTime() ? "current" : ""} ${date.date.getMonth() != actualDate.getMonth() ? "otherMonth" : ""}`
                          }>
              <div className="date">
                {date.date.getDate()}<a href="javascript:;" className="addEventOnDay" onClick={() => setShowingEventForm({ visible: true, preselectedDate: date.date })}>+</a>
              </div>
              {date.events.map((event, index) => 
                              <MiniEvent key={index} event={event} setViewingEvent={setViewingEvent} />
                          )}
            </div>
          )
        })}
      </Fragment>
    )
  }
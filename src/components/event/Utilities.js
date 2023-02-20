import { Fragment } from "react"
import "./Calendar.css"

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  
export const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  
export const toStartOfDay = (date) => {
      const newDate = new Date(date)
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)
    return newDate
  }
  
  export const pad = (input) => {
      return input < 10 ? "0" + input : input
  }
  
  // I'm using default <input type="datepick-local">,
  // so a specific date format is required
export const dateToInputFormat = (date) => {
      if (!date) {
        return null
    }
    
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    
    return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`
  }
  
  
export const Modal = ({ children, onClose, title, className }) => {
    return (
      <Fragment>
        <div className="calendarOverlay" onClick={onClose} />
        <div className={`calendarModal ${className}`}>
          <h3>{title}</h3>
          <div className="calendarInner">
            {children}
          </div>
        </div>
      </Fragment>
    )
  }

  export const Loader = () => {
    return (
      <Fragment>
        <div className="calendarOverlay" />
        <div className="loader">
          <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>  
          </div>
        </div>
      </Fragment>
    )
  }

  export const Feedback = ({ message, type }) => {
    return (
      <div className={`feedback ${type}`}>{message}</div>
    )
  }


  export const findEventsForDate = (events, date) => {
	const dateTime = date.getTime()

  return events.filter(event => {
    const eventFromTime = toStartOfDay(event.from).getTime()
    const eventToTime = toStartOfDay(event.to).getTime()

    return (dateTime >= eventFromTime && dateTime <= eventToTime)
  })
}

export const DayLabels = () => {
    return DAYS_SHORT.map((dayLabel, index) => {
      return <div className="dayLabel cell" key={index}>{dayLabel}</div>
    })
  }
  
  // An individual event displayed within the calendar grid itself
  // can be clicked to open the main event view
  export const MiniEvent = ({ event, setViewingEvent }) => {
    const firstWord = event.park.name ? event.park.name.split(" ")[0] : "standard";
  
    return (
      <div 
        className={`miniEvent ${firstWord}`} 
        onClick={() => setViewingEvent(event)}
      >
        {event.name}
      </div>
    );
  };
  

  export const parseEvents = (events) => {
    return events.map(event => {
        const from = new Date(event.start_date)
      const to = new Date(event.end_date)
  
      return {
        ...event,
        from,
        to
      }
    })
  }
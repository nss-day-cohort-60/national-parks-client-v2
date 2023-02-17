import { Modal } from "./Utilities"
import "./Calendar.css"

export const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent, setEvents }) => {
  console.log(event)
  
    return (
      <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.type})`} className="eventModal">
        <p>From <b>{event.start_date}</b> to <b>{event.end_date}</b></p>
        <p>{event.description}</p>
  
        <button href="javascript:;" onClick={() => {
                  setViewingEvent(null)
                  setShowingEventForm({ visible: true, withEvent: event })
         }}>
          Change this event
        </button>
        
        <button className="red" href="javascript:;" onClick={() => deleteEvent(event)}>
          Delete this event
        </button>
  
        <a className="close" href="javascript:;" onClick={() => setViewingEvent(null)}>Back to calendar</a>
      </Modal>
    )
  }
  
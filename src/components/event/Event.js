import { Modal } from "./Utilities"
import "./Calendar.css"

export const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent, setEvents }) => {
    return (
      <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.type})`} className="eventModal">
        <p>From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b></p>
        <p>{event.meta}</p>
  
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
  
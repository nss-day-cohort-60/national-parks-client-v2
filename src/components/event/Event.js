import { Modal } from "./Utilities"
import "./Calendar.css"
import { fetchIt } from "../auth/fetchIt"

export const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent, setEvents }) => {
  console.log(event)
  const isStaff = localStorage.getItem('np_token').is_staff

  const signUp = () => {
    event = {...event, "register": true}
    fetchIt(`http://localhost:8000/events`, {
            method: "POST",
            body: JSON.stringify(event)
        })
        .then(res => res.JSON)
            .catch(error => console.log(error))
  }
  
    return (
      <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.type})`} className="eventModal">
        <p>From <b>{event.start_date}</b> to <b>{event.end_date}</b></p>
        <p>{event.description}</p>
        <>
        { isStaff? <>
        <button href="javascript:;" onClick={() => {
                  setViewingEvent(null)
                  setShowingEventForm({ visible: true, withEvent: event })
        }}>
          Change this event
        </button>
        
        <button className="red" href="javascript:;" onClick={() => deleteEvent(event)}>
          Delete this event
        </button></> : <button onClick={()=> [signUp(), setViewingEvent(null)]}>Register For This Event!</button>}
        </>
        <a className="close" href="javascript:;" onClick={() => setViewingEvent(null)}>Back to calendar</a>
      </Modal>
    )
  }
  
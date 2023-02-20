import { Modal } from "./Utilities"
import "./Calendar.css"
import { fetchIt } from "../auth/fetchIt"
import { FavoriteBtn } from "../favorites/favoriteBtn"

export const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent, setEvents }) => {
  console.log(event)
  const isStaff = JSON.parse(localStorage.getItem('np_token')).staff

  const signUp = () => {
    event = {...event, "register": true}
    event.event_type = event.event_type.id
    event.park = event.park.id
    fetchIt(`http://localhost:8000/events`, {
            method: "POST",
            body: JSON.stringify(event)
        })
        .then(res => res.JSON)
            .catch(error => console.log(error))
  }
  
    return (
      <Modal onClose={() => setViewingEvent(null)} title={`${event.name} (${event.park.name})`} className="eventModal">
        <p>From <b>{event.start_date}</b> to <b>{event.end_date}</b></p>
        <p>{event.description}</p>
        <FavoriteBtn resource={"events"} resource_id={Number(event.id)}/>
        <>
        { isStaff? <>
        <button className="regButton" href="javascript:;" onClick={() => {
                  setViewingEvent(null)
                  setShowingEventForm({ visible: true, withEvent: event })
        }}>
          Change this event
        </button>
        
        <button className="regButton--red" onClick={() => deleteEvent(event)}>
          Delete this event
        </button></> : <button className="regButton" onClick={()=> [signUp(), setViewingEvent(null)]}>Register For This Event!</button>}
        </>
        <a className="close" onClick={() => setViewingEvent(null)}>Back to calendar</a>
      </Modal>
    )
  }
  
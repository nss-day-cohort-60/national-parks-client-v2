import { Fragment, useState } from "react"
import { dateToInputFormat, Modal } from "./Utilities"
import "./Calendar.css"

export const EventForm = ({ setShowingEventForm, addEvent, editEvent, withEvent, setViewingEvent, preselectedDate }) => {
    const newEvent = withEvent || {
      name: "",
      park: 1,
      event_type: 1
    }
    if (!withEvent && !!preselectedDate) {
      newEvent.start_date = dateToInputFormat(preselectedDate)
    }
    const [event, setEvent] = useState(newEvent)
  
    return (
      <Modal onClose={() => setShowingEventForm({ visible: false })} title={`${withEvent ? "Edit event" : "Add a new event"}`}>
        <div className="calendarForm">
          <label>Name
            <input type="text" placeholder="ie. My Event" defaultValue={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
          </label>
  
          <label>Date from
            <input type="datetime-local" defaultValue={event.start_date || dateToInputFormat(preselectedDate)} onChange={(e) => setEvent({ ...event, start_date: e.target.value })} />
          </label>
  
          <label>Date to
            <input type="datetime-local" defaultValue={event.end_date} onChange={(e) => setEvent({ ...event, end_date: e.target.value })} />
          </label>
          
          <label>Type
            <select value={event.event_type} defaultValue={event.event_type} onChange={(e) => setEvent({ ...event, event_type: e.target.value })}>
              <option value="1">Group Hikes</option>
              <option value="2">Park Science</option>
              <option value="3">Park History</option>
              <option value="4">Holiday Event</option>
              <option value="5">Movement</option>
              <option value="6">Ranger Events</option>
            </select>
          </label>
  
          <label>Description
            <input type="text" placeholder="Describe the event" defaultValue={event.meta} onChange={(e) => setEvent({ ...event, meta: e.target.value })} />
          </label>

          <label>Park
            <select defaultValue={0} onChange={(e) => setEvent({ ...event, park: e.target.value })}>
              <option value="1">Joshua Tree</option>
              <option value="2">Everglades</option>
              <option value="3">Great Smoky Mountains</option>
              <option value="4">Haleakalā</option>
              <option value="5">Yosemite</option>
              <option value="6">Glacier National Park</option>
              <option value="7">Kenai Fjords</option>
              <option value="8">Shenandoah</option>
              <option value="9">Saguaro National Park</option>
            </select>
          </label>
  
          {withEvent ? (
              <Fragment>
              <button onClick={() => editEvent(event)}>Edit event</button>
              <a className="close" href="javascript:;" onClick={() => {
                  setShowingEventForm({ visible: false })
                  setViewingEvent(event)}
              }>
                Cancel (go back to event view)
              </a>
            </Fragment>
          ) : (
              <Fragment>
              <button onClick={() => addEvent(event)}>Add event to calendar</button>
              <a className="close" href="javascript:;" onClick={() => [setShowingEventForm({ visible: false }), setViewingEvent(false)]}>Cancel (go back to calendar)</a>
            </Fragment>
          )}
        </div>
      </Modal>
    )
  }
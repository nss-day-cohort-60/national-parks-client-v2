import { Calendar } from "./Calendar"
import { ParkFilter } from "./ParkFilter"
import { useState, useEffect } from "react"

export const EventsContainer = () => {
    const [events, setEvents] = useState([])
    console.log(events)

    return (
    <section className="Events">
            <div className="EventsPage">
                <ParkFilter events={events} eventSetter={setEvents}/>
                <Calendar month={14} year={2022} databaseEvents={events} preloadedEvents={[
      {
        id: 1,
        name: "Holiday",
        start_date: "2023-01-29T12:00",
        end_date: "2023-02-03T08:45",
        type: "Holiday"
      }
    ]} />
                
            </div>
        </section>
    )

}


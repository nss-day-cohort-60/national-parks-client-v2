import { Calendar } from "./Calendar"
import { ParkFilter } from "./ParkFilter"
import { useState, useEffect } from "react"

export const EventsContainer = () => {
    const [events, setEvents] = useState([])

    return (
    <section className="Events">
            <div className="EventsPage">
                <ParkFilter events={events} eventSetter={setEvents}/>
                <Calendar month={14} year={2022} events={events}/>
            </div>
        </section>
    )

}
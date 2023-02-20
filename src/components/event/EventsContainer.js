import { Calendar } from "./Calendar"
import { ParkFilter } from "./ParkFilter"
import { useState, useEffect } from "react"
import "./Calendar.css"
import { Header } from "./Header"

export const EventsContainer = () => {
    const [events, setEvents] = useState([])
    const [park_id, setPark_id] = useState(0)
    console.log(park_id)

    return (
    <section className="Events">
            <div className="EventsPage">
                <Header park_id={park_id} events={events[0]}/>
                <ParkFilter events={events} eventSetter={setEvents} park_id={park_id} setPark_id={setPark_id}/>
                <Calendar month={14} year={2022} databaseEvents={events}/>
                
            </div>
        </section>
    )

}


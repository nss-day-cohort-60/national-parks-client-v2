import { useEffect, useState } from "react"

export const Header = ({events, park_id}) => {
    const [headerEvents, setHeaderEvents] = useState([])

    useEffect(() => {
        setHeaderEvents(events)
    }, [events])


console.log(park_id)

    return (
        <section className="Events">
                <div className="EventsHeader">
                    Viewing Events for 
                </div>
            </section>
        )
}
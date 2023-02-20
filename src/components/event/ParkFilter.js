import { useState, useEffect } from "react"


export const ParkFilter= ({ events, eventSetter, setPark_id, park_id }) => {
    const [parks, setParks] = useState([])
    

    const parkList = () => {
        return fetch(`http://localhost:8000/parks`)
            .then(res => res.json())
            .then(data => setParks(data))
    }

    const getAllEvents = () => {
        return fetch(`http://localhost:8000/events`)
            .then(res => res.json())
            .then(data => eventSetter(data))
    }

    useEffect(() => {
        parkList()
        getAllEvents()
    }, []
    )

    useEffect(() => {
        menuHTML()
    }, [parks, events])

    const filteredEventFetcher = (park_id) => {
        return fetch(`http://localhost:8000/events?park_id=${park_id}`)
            .then(res => res.json())
            .then(data => eventSetter(data))
    }

    useEffect(() => {
        if (parseInt(park_id) !== 0) {
            filteredEventFetcher(park_id)
        }
        else {
            getAllEvents()
        }
    }, [park_id])

    const menuHTML = () => {
        return (
            <section className='blogFilterSearch--container'>
                <div className="filter--container">
                    <label>Filter Events by Park: </label>
                    <select className="filter" onChange={ (e) => setPark_id(e.target.value)}>
                        <option key={`park--0`} value={0}>All Parks</option>
                        {parks.map(park => { return (<option key={`park--${park.id}`} value={park.id}>{park.name}</option>) })}
                    </select>
                </div>
            </section>
        )
    }

    return (
        <>
            {menuHTML()}
        </>
    )
}
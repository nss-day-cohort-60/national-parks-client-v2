import { useState, useEffect } from "react"


export const ParkFilter= ({ searchSetterFunction, events, eventSetter }) => {
    const [parks, setParks] = useState([])
    const [park_id, setPark_id] = useState(0)

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
  
    // const blogSearchAndFilterFetcher = (park_id, searchTerm) => {
    //     return fetch(`http://localhost:8000/events?park_id=${park_id}&key_word=${searchTerm}`)
    //         .then(res => res.json())
    //         .then(data => eventSetter(data))
    // }

    // const blogSearchFetcher = (searchTerm) => {
    //     return fetch(`http://localhost:8000/blogs?key_word=${searchTerm}`)
    //         .then(res => res.json())
    //         .then(data => blogSetterFunction(data))
    // }

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
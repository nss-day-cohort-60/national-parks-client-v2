import { useState, useEffect } from "react"

export const BlogFilter = () => {
    const [blogs, setBlogs] = useState([{ }])
    const [parks, setParks] = useState([{ }])
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBlogFetcher = (park_id) => {
        return fetch(`http://localhost:8088/blogs?park_id=${park_id}`)
            .then(res => res.json())
            .then(data => setBlogs(data))
    }

    const parkList = () => {
        return fetch(`http://localhost:8088/parks`)
            .then(res => res.json())
            .then(data => setParks(data))
    }

    const getAllBlogs = () => {
        return fetch(`http://localhost:8088/blogs`)
            .then(res => res.json())
            .then(data => setBlogs(data))
    }

    useEffect(() => {
        parkList()
        getAllBlogs()
    }, []
    )

    useEffect(() => {
        menuHTML()
    }, [parks, blogs])

    useEffect(() => {
        
    }, [searchTerm])

    const menuHTML = () => {
        return (
            <section className='blogFilterSearch--container'>
                <div className="filter--container">
                    <label>Filter Blogs by Park: </label>
                    <select className="filter" onChange={ (e) => [ e.target.value == 0? getAllBlogs() : filteredBlogFetcher(e.target.value)]}>
                        <option key={`park--0`} value={0}>All Parks</option>
                        {parks.map(park => { return (<option key={`park--${park.id}`} value={park.id}>{park.name}</option>) })}
                    </select>
                </div>
                <div className="search--container">
                    <label>Search Blogs: </label>
                    <input className="search" onChange={ (e) => {setSearchTerm(e.target.value)} } placeholder="type search terms here"/>
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
import { useState, useEffect } from "react"

export const BlogFilter = ({ searchSetterFunction, blogs, blogSetterFunction, searchTerm }) => {
    const [parks, setParks] = useState([])
    const [park_id, setPark_id] = useState(0)

    const parkList = () => {
        return fetch(`http://localhost:8088/parks`)
            .then(res => res.json())
            .then(data => setParks(data))
    }

    const getAllBlogs = () => {
        return fetch(`http://localhost:8088/blogs`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    useEffect(() => {
        parkList()
        getAllBlogs()
    }, []
    )

    useEffect(() => {
        menuHTML()
    }, [parks, blogs])

    const filteredBlogFetcher = (park_id) => {
        return fetch(`http://localhost:8088/blogs?park_id=${park_id}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    const blogSearchAndFilterFetcher = (park_id, searchTerm) => {
        return fetch(`http://localhost:8088/blogs?park_id=${park_id}&key_word=${searchTerm}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    const blogSearchFetcher = (searchTerm) => {
        return fetch(`http://localhost:8088/blogs?key_word=${searchTerm}`)
            .then(res => res.json())
            .then(data => blogSetterFunction(data))
    }

    useEffect(() => {
        if (park_id != 0 & searchTerm !== "" & searchTerm !== " ") {
            blogSearchAndFilterFetcher(park_id, searchTerm)
        }
        else if (park_id == 0 & searchTerm !== "" & searchTerm !== " ") {
            blogSearchFetcher(searchTerm)
        }
        else if (parseInt(park_id) !== 0 & (searchTerm === "" || searchTerm === " ")){
            filteredBlogFetcher(park_id)
        }
        else {
            getAllBlogs()
        }
    }, [park_id, searchTerm])

    const menuHTML = () => {
        return (
            <section className='blogFilterSearch--container'>
                <div className="filter--container">
                    <label>Filter Blogs by Park: </label>
                    <select className="filter" onChange={ (e) => setPark_id(e.target.value)}>
                        <option key={`park--0`} value={0}>All Parks</option>
                        {parks.map(park => { return (<option key={`park--${park.id}`} value={park.id}>{park.name}</option>) })}
                    </select>
                </div>
                <div className="search--container">
                    <label>Search Blogs: </label>
                    <input className="search" onChange={ (e) => {searchSetterFunction(e.target.value)} } placeholder="type search terms here"/>
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
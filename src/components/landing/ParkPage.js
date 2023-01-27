import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavBar } from "../nav/NavBar"

export const ParkPage = () => {
    
    const {park_id} = useParams()
    const [park, setPark] = useState()

    useEffect (
        () =>{
            fetch(`http://localhost:8088/parks/${park_id}`)
                .then(response => response.json())
                .then((parkObject)=>{
                    console.log(parkObject)
                    setPark(parkObject)
            })
        },
        []
    )

    console.log(park)

    return<>
    <NavBar/>
    <h1>{park.name}
    </h1>
    </>
}
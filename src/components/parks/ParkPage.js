import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PhotoCarousel } from "../landing/PhotoCarousel"
import "./Parks.css"
import { NavBar } from "../nav/NavBar"

export const ParkPage = () => {
    
    const {park_id} = useParams()
    const [park, setPark] = useState({})
    const [parkPhotos, setParkPhotos] = useState([])

    useEffect (
        () =>{
            fetch(`http://localhost:8088/parks/${park_id}`)
                .then(response => response.json())
                .then((parkObject)=>{
                    setPark(parkObject)
            })
        },
        []
    )

    useEffect (
        () =>{
            fetch(`http://localhost:8088/photos?park_id=${park_id}`)
                .then(response => response.json())
                .then((parkPhotoArray)=>{
                    setParkPhotos(parkPhotoArray)
            })
        },
        []
    )

    return<>
    <NavBar/>
    {console.log(parkPhotos)}
    <h1>{park.name}</h1>
    <p>{park.history}</p>
    <PhotoCarousel resource = {parkPhotos}/>
    </>
}
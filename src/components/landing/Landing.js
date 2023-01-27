import { PhotoCarousel } from "./PhotoCarousel" 
import { ParkList } from "../parks/ParksList"
import { useState, useEffect } from "react"
import { NavBar } from "../nav/NavBar"

export const Landing = () => {
    const [photos, setPhotos]=useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/photos`)
                .then(response => response.json())
                .then((data) => {
                    setPhotos(data)
                })
        },
        []
    )

    console.log(photos)
    return <>
    <NavBar />
    <h1 className="title--main">Explore National Parks</h1>
    <PhotoCarousel resource = {photos} />
    <ParkList />
    </>
}
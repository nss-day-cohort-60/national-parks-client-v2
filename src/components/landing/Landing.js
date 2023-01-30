import { PhotoCarousel } from "./PhotoCarousel"
import { ParkList } from "../parks/ParksList"
import { useState, useEffect } from "react"

export const Landing = () => {
    const [photos, setPhotos] = useState([])

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
        <div className="landing--top">
            <h1 className="title--main">Park Explorer: Discover National Parks</h1>
            <PhotoCarousel resource={photos} />
        </div>
        <ParkList />
    </>
}
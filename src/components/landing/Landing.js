import { PhotoCarousel } from "./PhotoCarousel"
import { ParkList } from "../parks/ParksList"
import { useState, useEffect } from "react"

export const Landing = () => {
    const [photos, setPhotos] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8000/photos`)
                .then(response => response.json())
                .then((data) => {
                    setPhotos(data)
                })
        },
        []
    )

    console.log(photos)
    return <>
            <PhotoCarousel resource={photos} />
        <ParkList />
    </>
}
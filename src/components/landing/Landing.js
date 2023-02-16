import { PhotoCarousel } from "./PhotoCarousel"
import { ParkList } from "../parks/ParksList"
import { useState, useEffect } from "react"
import { ParksMap } from "../map/ParksMap"

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

    return <>
        <PhotoCarousel resource={photos} />
        <ParksMap />
        <ParkList />
    </>
}


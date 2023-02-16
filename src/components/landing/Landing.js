import { PhotoCarousel } from "./PhotoCarousel"
import { useState, useEffect } from "react"
import { DisplayParks } from "./DisplayParks"

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
        <DisplayParks />
    </>
}


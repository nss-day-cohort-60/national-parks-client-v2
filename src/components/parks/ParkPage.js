import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PhotoCarousel } from "../landing/PhotoCarousel"
import "./Parks.css"
import { NavBar } from "../nav/NavBar"

export const ParkPage = () => {

    const { park_id } = useParams()
    const [park, setPark] = useState({})
    const [parkPhotos, setParkPhotos] = useState([])
    const [wildlife, setWildlife] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/parks/${park_id}`)
                .then(response => response.json())
                .then((parkObject) => {
                    setPark(parkObject)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/photos?park_id=${park_id}`)
                .then(response => response.json())
                .then((parkPhotoArray) => {
                    setParkPhotos(parkPhotoArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/wildlife?park_id=${park_id}`)
                .then(response => response.json())
                .then((wildlifeArray) => {
                    setWildlife(wildlifeArray)
                })
        },
        []
    )

    return <>
        <NavBar />
        <div className="park-page--container">
            <PhotoCarousel resource={parkPhotos} />
            <section id="park-page--info">
            <h1>{park.name}</h1>
            <p>{park.history}</p>
            <h1>Location</h1>
            <p>{park.city},{park.state}</p>
            <p>{park.latitude},{park.longitude}</p>
            <h1></h1>
            </section>
            <div>
                <h1>Wildlife at {park.name}</h1>
            {
                wildlife.map(
                    (animal) => {
                        return <>
                        <h1>{animal.name}</h1>
                        <img src={animal.image} />
                        <p>{animal.information}</p>
                        </>
                    }
                )
            }
        </div>
        </div>
    </>
}
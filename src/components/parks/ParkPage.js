import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PhotoCarousel } from "../landing/PhotoCarousel"
import "./parks.css"
import { NavBar } from "../nav/NavBar"

export const ParkPage = () => {

    const { park_id } = useParams()
    const [park, setPark] = useState({})
    const [parkPhotos, setParkPhotos] = useState([])
    const [wildlife, setWildlife] = useState([])
    const [campgrounds, setCampgrounds] = useState([])
    const [amenities, setAmenities] = useState([])

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

    useEffect(
        () => {
            fetch(`http://localhost:8088/campgrounds?park_id=${park_id}`)
                .then(response => response.json())
                .then((data) => {
                    setCampgrounds(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/park_amenities?park_id=${park_id}`)
                .then(response => response.json())
                .then((data) => {
                    setAmenities(data)
                })
        },
        []
    )

    const Amenity = () => {
       return amenities.map(
            (amenity) => {
                if(amenity.name !== null){
                return <>
                <p> - <b>{amenity.name}</b> || {amenity.type}</p>
                </>
                }
                else{
                return <>
                <p>- {amenity.type}</p>
                </>
                }
            }
        )
    }

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
                        <h2>{animal.name}</h2>
                        <img src={animal.image} className="park-page--sect-photo" />
                        <p>{animal.information}</p>
                        </>
                    }
                )
            }
                            <h1>Campgrounds at {park.name}</h1>
            {
                campgrounds.map(
                    (camp) => {
                        return <>
                        <h3>{camp.name} | Available sites: {camp.available_sites}</h3>
                        <p>{camp.description}</p>
                        </>
                    }
                )
            }
                            <h1>Amenities at {park.name}</h1>
            {
                Amenity()
            }
        </div>
        </div>
    </>
}
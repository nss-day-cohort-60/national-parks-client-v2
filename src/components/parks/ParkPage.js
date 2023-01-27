import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Parks.css"

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
    {console.log(parkPhotos)}
    <h1>{park.name}</h1>
    <p>{park.history}</p>
    {
        parkPhotos.map(
            (photo) => {
                return <img src={photo.url} className="park-photos" key={photo.id}/>
            }
        )
    }
    </>
}
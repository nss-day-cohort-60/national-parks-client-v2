import { useEffect, useState } from "react"


export const Park = ({ park }) => {
    const [photo, setPhoto] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/photos?user_id=11&park_id=${park.id}`)
            .then( res => res.json() )
            .then( (photosArray) => {
                const parkPhoto = photosArray[0]["url"]
                setPhoto(parkPhoto)
            })  
        },
        []
    )      

    return <>
        <section className="park" key={`park--${park.id}`}>
            <div className="park--name">{park.name}</div>
            <img className="park--photo"src={photo} alt="National Park"/>
        </section>
        </>
}
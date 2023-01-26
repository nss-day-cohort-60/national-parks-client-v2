import { useEffect, useState } from "react"


export const Park = ({ park }) => {
    const [photos, setPhotos] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/photos?user_id=11&park_id=${park.id}`)
            .then( res => res.json() )
            .then( (photosArray) => {
                setPhotos(photosArray)
            })  
        },
        []
    )      

    //{photos[0]["url"]}

    return <section className="park" key={`park--${park.id}`}>
            {park.name}
        </section>
}
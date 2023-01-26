import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Landing } from "./Landing"
import "./landing.css"

export const PhotoCarousel = () => {
    const [photos, setPhotos]=useState([])
    const [nextButton, nextButtonPressed]=useState(false)
    const [prevButton, prevButtonPressed] = useState(false)
    let [currentPhoto, setCurrentPhoto]= useState(0)

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

    useEffect(
        () => {
            if(nextButton===true){
                nextButtonPressed(false)
                if(currentPhoto!==photos.length-1){
                setCurrentPhoto(currentPhoto +1)
                }else{
                    setCurrentPhoto(photos[0].id)
                }
            }
        },
        [nextButton]
    )

    useEffect(
        () => {
            if(prevButton===true){
                prevButtonPressed(false)
            if(currentPhoto===1){
                setCurrentPhoto(photos.length-1)
            }else{
                setCurrentPhoto(currentPhoto -1)
            }
            }
        },
        [prevButton]
    )

    const Carousel = () => {
        return <>
    <div className="carousel">
        <button className="carousel--button prev" onClick={() => prevButtonPressed(true)} >&#171;</button>
        <button className="carousel--button next" onClick={() => nextButtonPressed(true)}>&#187;</button>
        <ul>
    {
        photos.map(
            (photo) => {
                return photos.indexOf(photo) === currentPhoto 
                ?<>
                <li className="carousel--slide" data-active key={photo.id} >
                <img src={photo.url} alt='National Park image' />
                </li>
                </>
                :<>
                <li className="carousel--slide" key={photo.id} >
                <img src={photo.url} alt='National Park image' />
                </li>
                </>
            }
        )
    }
    </ul>
    </div>
        </>
    }

    return <>
        {
            Carousel()
        }
    </>
}
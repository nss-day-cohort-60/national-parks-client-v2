import { useState, useEffect } from "react"
import "./landing.css"

export const PhotoCarousel = ({resource}) => {
    const [nextButton, nextButtonPressed]=useState(false)
    const [prevButton, prevButtonPressed] = useState(false)
    let [currentPhoto, setCurrentPhoto]= useState(0)

    useEffect(
        () => {
            if(nextButton===true){
                nextButtonPressed(false)
                if(currentPhoto!== resource.length-1){
                setCurrentPhoto(currentPhoto +1)
                }else{
                    setCurrentPhoto(0)
                }
            }
        },
        [nextButton]
    )

    useEffect(
        () => {
            if(prevButton===true){
                prevButtonPressed(false)
            if(currentPhoto===0){
                setCurrentPhoto(resource.length-1)
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
        resource.map(
            (photo) => {
                return resource.indexOf(photo) === currentPhoto 
                ?<>
                <li className="carousel--slide" data-active key={photo.id} >
                <img src={photo.url} alt='uploaded image' />
                </li>
                </>
                :<>
                <li className="carousel--slide" key={photo.id} >
                <img src={photo.url} alt='uploaded image' />
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
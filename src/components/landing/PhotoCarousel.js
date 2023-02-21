import { useState, useEffect } from "react"
import { FavoriteBtn } from "../favorites/favoriteBtn"
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

    useEffect (() =>{
        const interval = setInterval(() => {
            nextButtonPressed(!nextButton)
        }, 4200)
        return () => clearInterval(interval)
    }, []
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
    
    const verifyUser = () => {
        if (localStorage.getItem("np_token")){
            return <><FavoriteBtn resource = {"photos"} resource_id={(currentPhoto+1)}/></>
        } else {
            return <></>
        }
    }

    const LandingCarousel = () => {
    return <>
    <div id="landing--top">
    <h1 className="title--main">Park Explorer: Discover <span id="taglines"></span></h1>
    <div className="carousel">
        <button className="carousel--button prev" onClick={() => prevButtonPressed(true)} >&#171;</button>
        <button className="carousel--button next" onClick={() => nextButtonPressed(true)}>&#187;</button>
        <ul className="carousel-ul">
    {
        resource.map(
            (photo) => {
                let source = photo.url
                return resource.indexOf(photo) === currentPhoto 
                ?<>
                {document.getElementById("landing--top").style.backgroundImage=`url(${source})`}
                {document.getElementById("landing--top").style.backgroundRepeat=`none`}
                {document.getElementById("landing--top").style.backgroundPosition=`center`}
                <li className="carousel--slide" data-active >
                <img src={photo.url} alt='uploaded image' key={photo.id}/>
                </li>
                </>
                :<>
                <li className="carousel--slide" >
                <img src={photo.url} alt='uploaded image'  key={photo.id} />
                </li>
                </>
            }
        )
    }
    </ul>
    </div>
    </div>
    {
        verifyUser()
    }
        </>
    }

    const Carousel = () => {
        return <>
    <div className="carousel">
        <button className="carousel--button prev" onClick={() => prevButtonPressed(true)} >&#171;</button>
        <button className="carousel--button next" onClick={() => nextButtonPressed(true)}>&#187;</button>
        <ul className="carousel-ul">
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


    const FavoritesCarousel = () => {
    return <>
    <div className="fav--carousel">
        <button className="fav--carousel--button prev" onClick={() => prevButtonPressed(true)} >&#171;</button>
        <button className="fav--carousel--button next" onClick={() => nextButtonPressed(true)}>&#187;</button>
        <ul className="carousel-ul">
    {
        resource.map(
            (fav) => {
                return resource.indexOf(fav) === currentPhoto 
                ?<>
                <li className="fav--carousel--slide" data-active key={fav?.photo?.id} >
                <img src={fav?.photo?.url} alt='uploaded image' />
                </li>
                </>
                :<>
                <li className="fav--carousel--slide" key={fav?.photo?.id} >
                <img src={fav?.photo?.url} alt='uploaded image' />
                </li>
                </>
            }
        )
    }
    </ul>
    </div>
        </>
    }

    const verifyPath = () => {
        if(document.URL==="http://localhost:3000/home" || document.URL==="http://localhost:3000/"){
            return LandingCarousel()
        } else if(document.URL.includes('http://localhost:3000/parks')){
            return Carousel()
        } else if(document.URL.includes('http://localhost:3000/hub')){
            return FavoritesCarousel()
        }
    }

    return <>
        {
            verifyPath()
        }
    </>
}
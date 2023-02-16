import { useEffect, useState } from "react"
import { Park } from "./Park"
import "./parks.css" 
import { getParks } from "../utilities/ParkManager"


export const ParkList = () => {
    const [parks, setParks] = useState([])

    useEffect(
        () => {
            getParks()
            .then( (parksArray) => {
                setParks(parksArray)
            }) 
        },
        []
    )

    return <>
        
        <div className="parkslist--container">

        <article className="parks">
            {
                parks.map(
                    (park) => <Park park={park} />)
            }
        </article>
        </div>
    </>

}
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Parks.css"

export const ParkWildlife = ({park_id}) => {

    const [wildlife, setWildlife] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/wildlife?${park_id}`)
                .then(response => response.json())
                .then((wildlifeArray) => {
                    setWildlife(wildlifeArray)
                })
        },
        []
    )

    return <>
        <div>
            {
                wildlife.map(
                    (animal) => {
                        <p>{animal.name}</p>
                    }
                )
            }
        </div>
    </>
}
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const ParkPage = () => {
    
    const park_id = useParams
    const [park, setPark] = useState()

    return<>
    <h2>
        HELLO
    </h2>
    </>
}
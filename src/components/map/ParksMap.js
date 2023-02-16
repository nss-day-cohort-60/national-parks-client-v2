import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { getParks } from "../utilities/ParkManager"

export const ParksMap = () => {
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
        <MapContainer center={[44.96, -103.46]} zoom={3} scrollWheelZoom={false} style={{ height: "500px" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                parks.map( park => {
                    return <Marker position={[park.latitude, park.longitude]} key={park.id}>
                        <Popup>
                            <div style={{textAlign: 'center'}}>
                                <div>{park.name}</div>
                                <div style={{fontStyle: 'italic'}}>{park.city}, {park.state}</div>
                            </div>
                        </Popup>
                    </Marker>       
                })
            }
        </MapContainer>
    </>
}
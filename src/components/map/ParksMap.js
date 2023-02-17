import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getParks } from "../utilities/ParkManager"
import { Link } from 'react-router-dom'

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
                                <div><Link to={`/parks/${park.id}`} className="link_styles"><h5>{park.name}</h5></Link></div>
                                <div style={{fontStyle: 'italic'}}>{park.city}, {park.state}</div>
                            </div>
                        </Popup>
                    </Marker>       
                })
            }
        </MapContainer>
    </>
}
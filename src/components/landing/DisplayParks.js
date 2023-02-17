import { useState } from "react";
import { ParksMap } from "../map/ParksMap";
import { ParkList } from "../parks/ParksList";
import './displayParks.css'

export const DisplayParks = () => {
    const [enabled, setEnabled] = useState(true);

    return <> 
        <div className="titleContainer">
            <h2 className="parks__title">Visit a National Park</h2>
        </div>
        {       
            enabled ?
                <>
                    <div className="parksContainer">
                        <label className="switch">
                            <input type="checkbox" onClick={() => setEnabled(!enabled)}/>
                            <span className="slider round"></span>
                        </label>
                        <h5 className="switchTitle">View List of Parks</h5>
                    </div>
                    < ParksMap />
                </>
            : <>
                <div className="parksContainer">
                    <label className="switch">
                        <input type="checkbox" onClick={() => setEnabled(!enabled)}/>
                        <span className="slider round"></span>
                    </label>
                    <h5 className="switchTitle">View Map of Parks</h5>
                </div>
                < ParkList />
            </>
        }   
    </>
}
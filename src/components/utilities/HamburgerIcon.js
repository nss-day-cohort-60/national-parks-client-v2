import React from "react"
import './HamburgerIcon.css'

const HamburgerIcon = ({clickHandler}) => {
    return (
        <div className="hamburger" onClick={clickHandler}>
            <svg viewBox="0 0 100 100" width="40" height="40">
                <g color="rgb(200, 236, 200)">
                    <rect
                        width="100"
                        height="20"
                        rx="8"
                        fill="currentcolor"
                    ></rect>
                    <rect
                        y="30"
                        width="100"
                        height="20"
                        rx="8"
                        fill="currentcolor"
                    ></rect>
                    <rect
                        y="60"
                        width="100"
                        height="20"
                        rx="8"
                        fill="currentcolor"
                    ></rect>
                </g>
            </svg>
        </div>
    )
}

export default HamburgerIcon

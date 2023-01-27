import { PhotoCarousel } from "./PhotoCarousel" 
import { ParkList } from "../parks/ParksList"
import { NavBar } from "../nav/NavBar"

export const Landing = () => {
    return <>
    <NavBar />
    <h1 className="title--main">Explore National Parks</h1>
    <PhotoCarousel />
    <ParkList />
    </>
}
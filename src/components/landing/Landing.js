import { PhotoCarousel } from "./PhotoCarousel" 
import { ParkList } from "../parks/ParksList"

export const Landing = () => {
    return <>
    <h1 className="title--main">Explore National Parks</h1>
    <PhotoCarousel />
    <ParkList />
    </>
}
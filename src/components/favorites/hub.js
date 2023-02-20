import { useState, useEffect } from "react";
import { fetchIt } from "../auth/fetchIt";
import { PhotoCarousel } from "../landing/PhotoCarousel";
import { FavoriteBtn } from "./favoriteBtn";
import "./favorites.css"

export const UserHub = () => {

    const [events, setEvents] = useState([])
    const [blogs, setBlogs] = useState([])
    const [parks, setParks] = useState([])
    const [photos, setPhotos] = useState([])



    useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?events`)
          .then((data) => {
            setEvents(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?blogs`)
          .then((data) => {
            setBlogs(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?parks`)
          .then((data) => {
            setParks(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?photos`)
          .then((data) => {
            setPhotos(data);
          });
      }, []);

      const findFavorites = (favorites) => {
        return <>
            {
                favorites.map((fav) => {
                    return<>
                    <div className="container-fluid">
                      <h5>{fav?.event?.name}</h5>
                      <h5>{fav?.park?.name}</h5>
                      <h5>{fav?.post?.title}</h5>
                {fav.hasOwnProperty("post") && fav?.post?.photo !== null? <img src={fav?.post?.photo?.url} className="park-page--sect-photo" />: ""}
                      <p>{fav?.event?.description}</p>
                      <p>{fav?.park?.history}</p>
                      <p>{fav?.post?.post_body}</p>
                </div>
                    </>
                    })
            }</>
        }

      return <>
            <div className="container-fluid">
                <h1 className="blogs-title">Your Favorites Hub</h1>
                <div className="hub--events ms-5 mt-5"><h3><b>Events</b></h3>
                {
                    findFavorites(events)
                }
                </div>
                <div className="hub--blogs ms-5"><h3><b>Blogs</b></h3>
                <div className="">
                {
                    findFavorites(blogs)
                }
                </div>
                </div>
                <div className="hub--photos"><h3><b>Photos</b></h3>
                    <PhotoCarousel resource={photos} />
                </div>
                <div className="hub--parks"><h3><b>Parks</b></h3>
                {
                    findFavorites(parks)
                }
                </div>
            </div>
      </>
}
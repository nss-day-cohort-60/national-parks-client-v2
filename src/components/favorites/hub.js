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
                     <h5>{fav?.event?.name}</h5>
                     <h5>{fav?.park?.name}</h5>
                     <h5>{fav?.post?.title}</h5>
                     <p>{fav?.event?.description}</p>
                     </>
                    })
            }</>
        }

      return <>
            <div className="hub--container">
                <h1 className="hub--title"> YOUR FAVORITES HUB </h1>
                <div className="hub--events"><h3>Events</h3>
                {
                    findFavorites(events)
                }
                </div>
                <div className="hub--blogs"><h3>Blogs</h3>
                {
                    findFavorites(blogs)
                }
                                <p>testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                </p>
                </div>
                <div className="hub--photos"><h3>Photos</h3>
                    <PhotoCarousel resource={photos} />
                </div>
                <div className="hub--parks"><h3>Parks</h3>
                {
                    findFavorites(parks)
                }
                <p>testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                testing scroll testing scroll testing scroll testing scroll testig scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll testing scroll 
                </p>
                </div>
            </div>
      </>
}
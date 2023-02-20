import React, { useEffect, useState } from 'react'

import { fetchIt } from "../auth/fetchIt";
import { PhotoCarousel } from "../landing/PhotoCarousel";
import { FavoriteBtn } from "./favoriteBtn";

export const UserHub1 = () => {

        const [events, setEvents] = useState([]);
        const [blogs, setBlogs] = useState([]);
        const [parks, setParks] = useState([]);
        const [photos, setPhotos] = useState([]);

        useEffect(() => {
          fetchIt(`http://localhost:8000/favorites?events`).then((data) => {
            setEvents(data);
          });
        }, []);

        useEffect(() => {
          fetchIt(`http://localhost:8000/favorites?blogs`).then((data) => {
            setBlogs(data);
          });
        }, []);

        useEffect(() => {
          fetchIt(`http://localhost:8000/favorites?parks`).then((data) => {
            setParks(data);
          });
        }, []);

        useEffect(() => {
          fetchIt(`http://localhost:8000/favorites?photos`).then((data) => {
            setPhotos(data);
          });
        }, []);

        const findFavorites = (favorites) => {
          return (
            <>
              {favorites.map((fav) => {
                return (
                  <>
                    <div className="container-fluid">
                      <h5>{fav?.event?.name}</h5>
                      <h5>{fav?.park?.name}</h5>
                      <h5>{fav?.post?.title}</h5>
                      {fav.hasOwnProperty("post") &&
                      fav?.post?.photo !== null ? (
                        <img
                          src={fav?.post?.photo?.url}
                          className="park-page--sect-photo"
                        />
                      ) : (
                        ""
                      )}
                      <p>{fav?.event?.description}</p>
                      <p>{fav?.park?.history}</p>
                      <p>{fav?.post?.post_body}</p>
                    </div>
                  </>
                );
              })}
            </>
          );
        };

  return (
    <div>hub1</div>
  )
}

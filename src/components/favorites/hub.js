import React, { useEffect, useState } from "react";

import { fetchIt } from "../auth/fetchIt";
import { PhotoCarousel } from "../landing/PhotoCarousel";
import { FavoriteBtn } from "./favoriteBtn";
import "./hub.css";

export const UserHub = () => {
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
              <h5>{fav?.event?.name}</h5>
              <h5>{fav?.park?.name}</h5>
              <h5>{fav?.post?.title}</h5>
              {fav.hasOwnProperty("post") && fav?.post?.photo !== null ? (
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
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h1 className="d-flex justify-content-center hub-title">
            Your Favorites Hub
          </h1>
        </div>
        <div className="row mt-2 mb-5 mt-5 d-flex justify-content-evenly">
          <div className="col-sm-12 col-md-5 hub-carousel">
            <h3 className="hub-subtitle">Photos</h3>
            <PhotoCarousel resource={photos} />
          </div>
          <div className="col-sm-12 col-md-5">
            <h3 className="hub-subtitle">Parks</h3>
            <div className="box hub-parks">{findFavorites(parks)}</div>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-5">
        <div className="row ms-1 d-flex justify-content-evenly">
          <div className="col-sm-12 col-md-5">
            <h3 className="hub-subtitle">Events</h3>
            <div className="box hub-events">{findFavorites(events)}</div>
          </div>
          <div className="col-sm-12 col-md-5">
            <h3 className="hub-subtitle">Blogs</h3>
            <div className="box hub-blogs">{findFavorites(blogs)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PhotoCarousel } from "../landing/PhotoCarousel";
import "./parks.css";

export const ParkPage = () => {
  const { park_id } = useParams();
  const [park, setPark] = useState({});
  const [parkPhotos, setParkPhotos] = useState([]);
  const [wildlife, setWildlife] = useState([]);
  const [campgrounds, setCampgrounds] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [naturalAttractions, setNaturalAttractions] = useState([]);
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/parks/${park_id}`)
      .then((response) => response.json())
      .then((parkObject) => {
        setPark(parkObject);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/photos?park_id=${park_id}`)
      .then((response) => response.json())
      .then((parkPhotoArray) => {
        setParkPhotos(parkPhotoArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/wildlife?park_id=${park_id}`)
      .then((response) => response.json())
      .then((wildlifeArray) => {
        setWildlife(wildlifeArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/campgrounds?park_id=${park_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCampgrounds(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/park_amenities?park_id=${park_id}`)
      .then((response) => response.json())
      .then((data) => {
        setAmenities(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/natural_attractions?park_id=${park_id}`)
      .then((response) => response.json())
      .then((data) => {
        setNaturalAttractions(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/blogs?park_id=${park_id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  const Amenity = () => {
    return amenities.map((amenity) => {
      if (amenity.name !== null) {
        return (
          <>
            <p>
              {" "}
              - <b>{amenity.name}</b> || {amenity.type}
            </p>
          </>
        );
      } else {
        return (
          <>
            <p>- {amenity.type}</p>
          </>
        );
      }
    });
  };

  return (
    <>
      <div className="park-page--container">
        <PhotoCarousel resource={parkPhotos} />
        <section id="park-page--info">
          <h1>{park.name}</h1>
          <p>{park.history}</p>
          <h1>Location</h1>
          <p>
            {park.city},{park.state}
          </p>
          <p>
            {park.latitude},{park.longitude}
          </p>
          <h1></h1>
        </section><h1>Blogs about {park.name}</h1>
        <div className="park--blogs" id="blog--container">
          
          {blogs.map((blog) => {
            return (
              <>
                <h2>{blog.title}</h2>
                <h6>{blog.date_created}</h6>
                <div>
                {blog.photo_url !== null? <img src={blog.photo_url} className="park-page--sect-photo" />: ""}
                <p className="park--blog" >{blog.post_body}</p>
                </div>
              </>
            );
          })}
        </div>
        <div>
          <h1>Wildlife at {park.name}</h1>
          {wildlife.map((animal) => {
            return (
              <>
                <h2>{animal.name}</h2>
                <img src={animal.image} className="park-page--sect-photo" />
                <p>{animal.information}</p>
              </>
            );
          })}
          <h1>Campgrounds at {park.name}</h1>
          {campgrounds.map((camp) => {
            return (
              <>
                <h3>
                  {camp.name} | Available sites: {camp.available_sites}
                </h3>
                <p>{camp.description}</p>
              </>
            );
          })}
          <h1>Amenities at {park.name}</h1>
          {Amenity()}

          <h1>Natural Attractions at {park.name}</h1>

          {naturalAttractions.map((attraction) => {
            return (
              <div key={`attraction-${attraction.id}`}>
                <h3>{attraction.name}</h3>
                <p>{attraction.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

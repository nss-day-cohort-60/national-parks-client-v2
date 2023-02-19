import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PhotoCarousel } from "../landing/PhotoCarousel";
import "./parks.css";
import { fetchIt } from "../auth/fetchIt";
import { FavoriteBtn } from "../favorites/favoriteBtn";

const PictureCard = ({ title, image, body, created }) => {
  return (
    <div className="card my-2">
      <div className="row no-gutters">
        {image ? (
          <div className="col-sm-12 col-md-4 my-3">
            <img src={image} className="img-fluid card-image" alt="blog-img" />
          </div>
        ) : (
          ""
        )}
        <div className="col">
          <div className="card-block px-2 my-3">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{body}</p>
          </div>
        </div>
      </div>
      {created ? (
        <div className="card-footer w-100 text-muted">Posted on {created}</div>
      ) : (
        ""
      )}
    </div>
  );
};

const TextCard = ({ title, subtitle, body }) => {
  return (
    <div className="card col-sm-12 col-md-3 my-2 mx-2 park-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {subtitle ? (
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        ) : (
          ""
        )}
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
};

export const ParkPage = () => {
  const { park_id } = useParams();
  const [park, setPark] = useState({});
  const [parkPhotos, setParkPhotos] = useState([]);
  const [wildlife, setWildlife] = useState([]);
  const [campgrounds, setCampgrounds] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [naturalAttractions, setNaturalAttractions] = useState([]);
  const [blogs, setBlogs] = useState([]);


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
    fetch(`http://localhost:8000/amenities?park_id=${park_id}`)
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
          <div key={amenity.id}>
            <p>
              {" "}
              - <b>{amenity.name}</b> || {amenity.amenity.type}
            </p>
          </div>
        );
      } else {
        return (
          <div key={amenity.id}>
            <p>- {amenity.amenity.type}</p>
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row park-row">
          <div className="col-sm-12 col-md-7">
              <PhotoCarousel
                resource={parkPhotos}/>
          </div>
          <div className="col-sm-12 col-md-5">
            <section>
              <h1>{park.name}</h1>
              <p>{park.history}</p>
              <h1>Location</h1>
              <p>
                {park.city}, {park.state}
              </p>
              <p>
                Coordinates: {park.latitude},{park.longitude}
              </p>
              <FavoriteBtn />
            </section>
          </div>
        </div>

        <div className="row">
          <h1>Blogs</h1>
          {blogs.map((blog) => (
            <PictureCard
              title={blog.title}
              image={blog?.photo?.url}
              body={blog.post_body}
              created={blog.date_created}
            />
          ))}
        </div>
        <div className="row">
          <h1>Wildlife</h1>
          {wildlife.map((animal) => (
            <PictureCard
              title={animal.name}
              image={animal.image}
              body={animal.information}
            />
          ))}
        </div>
        <div className="row">
          <h1>Campgrounds</h1>
          {campgrounds.map((camp) => (
            <TextCard
              title={camp.name}
              subtitle={`Available sites: ${camp.available_sites}`}
              body={camp.description}
            />
          ))}
        </div>
        <div className="row">
          <h1>Amenities</h1>
          {Amenity()}
        </div>
        <div className="row">
          <h1>Natural Attractions</h1>
          {naturalAttractions.map((attraction) => (
            <TextCard
              key={`attraction-${attraction.id}`}
              title={attraction.name}
              body={attraction.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

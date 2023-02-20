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
    <div className="card col-sm-12 col-md-4 my-2 park-card">
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

const CampCard = ({title, subtitle, image, body}) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top camp-image my-2 mx-2" alt="campground-image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-muted mt-2 mb-2">Available Sites: {subtitle}</h6>
        <p className="card-description">{body}</p>
      </div>
    </div>
  );
}

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
        console.log(data)
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
            <PhotoCarousel resource={parkPhotos} />
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
        <div>
          <hr></hr>
        </div>
        <div className="row">
          <h1 className="parkPage-subheader">Blogs</h1>
          {blogs.map((blog) => (
            <PictureCard
              title={blog.title}
              image={blog?.photo?.url}
              body={blog.post_body}
              created={blog.date_created}
            />
          ))}
          <div>
            <hr></hr>
          </div>
        </div>
        <div className="row">
          <h1 className="parkPage-subheader">Wildlife</h1>
          {wildlife.map((animal) => (
            <PictureCard
              title={animal.name}
              image={animal.image}
              body={animal.information}
            />
          ))}
          <div>
            <hr></hr>
          </div>
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
          <div>
            <hr></hr>
          </div>
        </div>
        <h1 className="parkPage-subheader">Campgrounds</h1>
        <div className="row">
          {campgrounds.map((camp) => (
            <div className="col-sm-12 col-md-4 me-5">
              <CampCard
                image={camp.image}
                title={camp.name}
                subtitle={camp.available_sites}
                body={camp.description}
              />
            </div>
          ))}
          <div>
            <hr></hr>
          </div>
        </div>
        <div className="row">
          <h1 className="parkPage-subheader">Amenities</h1>
          {Amenity()}
        </div>
        <div>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

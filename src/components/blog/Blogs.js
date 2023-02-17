import { useEffect, useState } from "react";
import "./Blogs.css";
import { AddBlog } from "./AddBlog";
import { EditBlog } from "./EditBlog";
import { FavoriteBtn } from "../favorites/favoriteBtn";

const MyCard = ({ title, image, body }) => {
  return (
    <div className="card my-5 mx-5">
      <div className="row no-gutters">
        {image ? (
          <div className="col-sm-12 col-md-4">
            <img src={image} className="img-fluid" alt="blog-img" />
          </div>
        ) : (
          ""
        )}

        <div className="col">
          <div className="card-block px-2">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{body}</p>
          </div>
        </div>
      </div>
      <div>
        <FavoriteBtn />
      </div>
    </div>
  );
};

export const Blogs = ({ searchTermState, blogs }) => {
  const [filteredBlogs, setFiltered] = useState(blogs);
  const [blogModal, setBlogModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setFiltered(blogs);
  }, [searchTermState, blogs]);

  useEffect(() => {
    const user = localStorage.getItem("np_token");
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const toggleBlogModal = () => {
    setBlogModal(!blogModal);
  };

  return (
    <div>
      {loggedIn ? (
        <button className="save-blog" onClick={toggleBlogModal}>
          Add a Blog
        </button>
      ) : (
        ""
      )}
      <div>
        {blogs.map((blog) => (
          <MyCard
            key={`blog--${blog.id}`}
            title={blog.title}
            image={blog.photo?.url}
            body={blog.post_body}
          />
        ))}
      </div>
      {blogModal && <AddBlog setBlogModal={setBlogModal} />}
    </div>
  );
};

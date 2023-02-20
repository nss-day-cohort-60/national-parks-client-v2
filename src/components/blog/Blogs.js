import { useEffect, useState } from "react";
import "./Blogs.css";
import { AddBlog } from "./AddBlog";
import { EditBlog } from "./EditBlog";
import { FavoriteBtn } from "../favorites/favoriteBtn";

const verifyUser = (id) => {
  if (localStorage.getItem("np_token")){
      return <><FavoriteBtn resource = {"blogs"} resource_id={id}/></>
  } else {
      return <></>
  }
}

const MyCard = ({ title, image, body, blog_id }) => {
  return (
    <div className="card my-5 mx-5">
      <div className="row no-gutters">
        {image ? (
          <div className="col-sm-12 col-md-4 my-3 mx-3">
            <img src={image} className="img-fluid card-image" alt="blog-img" />
          </div>
        ) : (
          ""
        )}
        <div className="col">
          <div className="card-block my-3 mx-2 blog-text">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{body}</p>
          </div>
        </div>
      </div>
      <div>
        {verifyUser(blog_id)}
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
        <button className="button-3" onClick={toggleBlogModal}>
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
            blog_id={blog.id}
          />
        ))}
      </div>
      {blogModal && <AddBlog setBlogModal={setBlogModal} />}
    </div>
  );
};

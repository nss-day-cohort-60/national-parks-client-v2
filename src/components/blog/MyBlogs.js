import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("np_user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser)
      fetch(`http://localhost:8088/blogs?user_id=${parsedUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBlogs(data);
        });
    }
  }, []);

  const deleteBlog = (id) => {
           const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        )
        if (!confirmed) return
        fetch(`http://localhost:8088/blogs/${id}`, {
            method: "DELETE",
        }).then(() => {
            navigate(0) //refreshes the page
        })
  }

  return (
    <>
      <header className="blogs-title">My Blogs</header>
      <div className="blogs-block">
        {blogs.map((blog) => {
          return (
            <section
              className="blog"
              key={`blog--${blog.id}`}
              id={`${blog.id}`}
            >
              <header className="blogs">
                <div className="blog-details">
                  <div className="title">{blog.title}</div>
                  <div className="blog-post">{blog.post_body}</div>
                  {blog.photo_url ? (
                    <img
                      src={blog.photo_url}
                      alt="blog photos"
                      className="blog-img"
                    />
                  ) : (
                    <div className="no-image"></div>
                  )}
                </div>
              </header>
              <div>
                <button
                  className="edit-button"
                  onClick={() => {
                    navigate(`/edit-blog/${user.id}/${blog.id}`);
                  }}
                >
                  Edit Blog
                </button>
                <button className="delete-button" onClick={()=>{
                    deleteBlog(blog.id)
                }}>Delete Blog</button>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";
import { EditBlog } from "./EditBlog";

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({})
  const [editModal, setEditModal] = useState(false)
  const [editId, setEditId] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("np_token");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser)
      fetch(`http://localhost:8000/blogs?user_id=${parsedUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBlogs(data);
        });
    }
  }, []);

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const deleteBlog = (id) => {
          const confirmed = window.confirm(
             "Are you sure you want to delete this blog?"
        )
        if (!confirmed) return
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: "DELETE",
        }).then(() => {
            navigate(0) //refreshes the page
        })
  }

  return (
    <>
      <header className="blogs-title"><h1>My Blogs</h1></header>
      <div className="blogs-block" style={{padding:"20px"}}>
        {blogs.map((blog) => {
          return (
            <section
              className="blog"
              key={`blog--${blog.id}`}
              id={`${blog.id}`}
            >
              <header className="blogs">
                <div className="blog-details">
                  <div className="title"><h5>{blog.title}</h5></div>
                  <div className="blog-post"><p>{blog.post_body}</p></div>
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
              <button className="edit-blog" id={blog.id} onClick={e => {return [setEditId(blog.id), toggleEditModal()]}}>
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
      {editModal && <EditBlog setEditModal={setEditModal} id={editId} />}
    </>
  );
};

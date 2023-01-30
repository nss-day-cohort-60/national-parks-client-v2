import { useEffect, useState } from "react"
import "./Blogs.css"
import { AddBlog } from "./AddBlog"
import { EditBlog } from "./EditBlog"


export const Blogs = ({ searchTermState, blogs }) => {
    const [filteredBlogs, setFiltered] = useState(blogs)
    const [blogModal, setBlogModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    useEffect(
        () => {
            setFiltered(blogs)
            console.log(blogs)
        },
        [ searchTermState, blogs ]
    )

    const toggleBlogModal = () => {
        setBlogModal(!blogModal)
    }
    
    const toggleEditModal = () => {
        setEditModal(!editModal)
    }

        return (
        <div>
            {editModal && <EditBlog setEditModal={setEditModal} />}
            <div className="blogs-panel">
                <article className="blogs" >
                    <header className="blogs-title">Blogs</header>
                    <button className="edit-blog" onClick={toggleEditModal}>Edit a Blog</button>
                    <button className="save-blog" onClick={toggleBlogModal}>Add a Blog</button>
                    <div className="blogs-block">
                        {blogs.map(
                            (blog) => {
                                return <section className="blog" key={`blog--${blog.id}`} id={`${blog.id}`}>
                                    <header className="blogs">
                                        <div className="blog-details">
                                        <div className="title">{blog.title}</div> 
                                        <div className="blog-post">{blog.post_body}</div>
                                        {blog.photo_url ? <img src={blog.photo_url} alt="blog photos" className="blog-img"/> : <div className="no-image"></div>}
                                        </div>
                                        </header>
                                </section>
                            }
                        )
                        }
                    </div>
                </article>
                {blogModal && <AddBlog setBlogModal={setBlogModal} />}
            </div>
        </div>
        )
    }

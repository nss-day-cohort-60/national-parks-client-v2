import { useEffect, useState } from "react"
import "./Blogs.css"
import { AddBlog } from "./AddBlog"
import { EditBlog } from "./EditBlog"
import { FavoriteBtn } from "../favorites/favoriteBtn"


export const Blogs = ({ searchTermState, blogs }) => {
    const [filteredBlogs, setFiltered] = useState(blogs)
    const [blogModal, setBlogModal] = useState(false)

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
    
        return (
        <div>
            <div className="blogs-panel">
                <article className="blogs" >
                    <button className="save-blog" onClick={toggleBlogModal}>Add a Blog</button>
                    <div className="blogs-block">
                        {blogs.map(
                            (blog) => {
                                return <section className="blog" key={`blog--${blog.id}`} id={`${blog.id}`}>
                                    <header className="blogs">
                                        <div className="blog-details">
                                        <div className="title"><h3>{blog.title}</h3></div> 
                                        <div className="secondRow">
                                        {blog.photo?.url ? <img src={blog.photo?.url} alt="blog photos" className="blog-img"/> : <div className="no-image"></div>}
                                        <div className="blog-post"><p>{blog.post_body}</p></div></div>
                                        
                                        </div><><FavoriteBtn /></>
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

import { useEffect, useState } from "react"
import "./Blogs.css"
import { AddBlog } from "./AddBlog"


export const Blogs = ({ searchTermState, blogs }) => {
    const [filteredBlogs, setFiltered] = useState(blogs)
    const [modal, setModal] = useState(false)

    useEffect(
        () => {
            setFiltered(blogs)
            console.log(blogs)
        },
        [ searchTermState, blogs ]
    )

    const toggleModal = () => {
        setModal(!modal)
    }
        return (
        <div>
            <div className="blogs-panel">
                <article className="blogs" >
                    <button className="save-blog" onClick={toggleModal}>Add a Blog</button>
                    <div className="blogs-block">
                        {blogs.map(
                            (blog) => {
                                return <section className="blog" key={`blog--${blog.id}`} id={`${blog.id}`}>
                                    <header className="blogs">
                                        <div className="blog-details">
                                        <div className="title">{blog.title}</div> 
                                        <div className="secondRow">
                                        {blog.photo_url ? <img src={blog.photo_url} alt="blog photos" className="blog-img"/> : <div className="no-image"></div>}
                                        <div className="blog-post">{blog.post_body}</div></div>
                                        
                                        </div>
                                        </header>
                                </section>
                            }
                        )
                        }
                    </div>
                </article>
                {modal && <AddBlog setModal={setModal} />}
            </div>
        </div>
        )
    }

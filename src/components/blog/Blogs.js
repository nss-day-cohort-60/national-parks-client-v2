import { useEffect, useState } from "react"
import "./Blogs.css"
import { BlogFilter } from "./BlogFilter"
import { NavBar } from "../nav/NavBar"


export const Blogs = ({ searchTermState, blogs }) => {
    const [filteredBlogs, setFiltered] = useState(blogs)

    useEffect(
        () => {
            setFiltered(blogs)
            console.log(blogs)
        },
        [ searchTermState, blogs ]
    )

        return (
        <div>
            <div className="blogs-panel">
                <article className="blogs" >
                    <header className="blogs-title">Blogs</header>
                    <div className="blogs-block">
                        {blogs.map(
                            (blog) => {
                                return <section className="blog" key={`blog--${blog.id}`} id={`${blog.id}`}>
                                    <header className="blogs">
                                        <div className="blog-details">
                                        <div className="title">{blog.title}</div> 
                                        <div className="blog-post">{blog.post_body}</div>
                                        <img src={blog.photo_url} alt="blog photos" className="blog-img"/>
                                        </div>
                                        </header>
                                </section>
                            }
                        )
                        }
                    </div>
                </article>
            </div>
        </div>
        )
    }

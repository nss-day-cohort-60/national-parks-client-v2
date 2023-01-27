import { useEffect, useState } from "react"
import "./Blogs.css"
import { BlogFilter } from "../views/BlogFilter"


export const Blogs = ({ searchTermState }) => {
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFiltered] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/blogs`)
            .then(response => response.json())
            .then((data) => {
                setBlogs(data)
                setFiltered(data)
            })
        },
        []
    )
     
    useEffect(
        () => {
            const searchedBlogs = blogs.filter(blog => blog.post_body.includes(searchTermState))
            setFiltered(searchedBlogs)
            console.log(filteredBlogs)
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

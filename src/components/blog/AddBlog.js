import { useState, useEffect } from "react"
import { fetchIt } from "../auth/fetchIt"
import "./Blogs.css"
export const AddBlog = ({ setBlogModal, Date }) => {

const localUser = localStorage.getItem("np_token")
const userObject = JSON.parse(localUser)
const [parks, setParks] = useState([])

const [blog, setBlog] = useState({
    title: "",
    post_body: "",
    date_created: 0,
    user_id: userObject.id,
    park_id: 0,
    photo_url: 0
})

useEffect(
    () => {
        fetch(`http://localhost:8000/parks`)
        .then( res => res.json() )
        .then( (allParks) => {
            setParks(allParks)
        })  
    },
    []
)      
const handleSaveButtonClick = (click) => {
    click.preventDefault()
    const blogToSendToAPI = {
        ...blog,
    }

    fetchIt(`http://localhost:8000/blogs`, {
        method: "POST",
        body: JSON.stringify(blogToSendToAPI)
    })
        .then(() => {
            window.location.reload()
            setBlogModal(false)
                })
            .catch(error => console.log(error))

        }


return (
    <>
    
        <form className="AddBlogForm">
        <div className="blogModal">
                    <div className="overlay">
                        {/* figure out how to route the boulder that the button was selected from and render the name, while holding the id */}
                        <div className="blogModal-content">
            <h2 className="BlogForm__title">Submit a Blog Post</h2>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form__control"
                        placeholder="Title"
                        value={blog.title}
                        onChange={
                            (evt) => {
                                const copy = { ...blog }
                                copy.title = evt.target.value
                                setBlog(copy)
                            }
                        } />
                </div>
                <fieldset>
                    <div className="form__group">
                        <div className="blog-body">
                        <label htmlFor="description">Body:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form__control"
                            placeholder="Write your blog here"
                            value={blog.post_body}
                            onChange={
                                (evt) => {
                                    const copy = { ...blog }
                                    copy.post_body = evt.target.value
                                    setBlog(copy)
                                }
                            } />
                    </div></div>
                </fieldset>
                <div className="form__group">
                    <select
                        onChange={(event) => {
                            const copy = { ...blog }
                            copy.park_id = parseInt(event.target.value)
                            setBlog(copy)
                        }}
                    >
                        <option value="" disabled selected>Select a park</option>
                        {parks.map((park) => {
                            return (
                                <option key={park.id} value={park.id}>
                                    {park.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </fieldset>

            <div className="form-group">
                <button className=".close-blogModal" type="button" onClick={(e) => setBlogModal(false)}>Cancel</button>
                <button className="save-blog" onClick={handleSaveButtonClick}>Save</button>
            </div>
            </div>
            </div>
            </div>
        </form>

    </>
)
                    }
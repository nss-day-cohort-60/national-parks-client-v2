import { useState, useEffect } from "react"
import "./Blogs.css"
export const EditBlog = ({ setEditModal, id }) => {

    const localUser = localStorage.getItem("np_token")
    const userObject = JSON.parse(localUser)
    const [parks, setParks] = useState([])

    const [blog, setBlog] = useState({
        id: id,
        title: "",
        post_body: "",
        date_created: 0,
        user_id: userObject.id,
        park_id: 0,
        photo_id: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8000/parks`)
                .then(res => res.json())
                .then((allParks) => {
                    setParks(allParks)
                })
            fetch(`http://localhost:8000/blogs/${id}`)
                .then(res => res.json())
                .then((foundBlog) => {
                    setBlog(foundBlog)
                })
        },
        []
    )
    const handleSaveButtonClick = (click) => {
        click.preventDefault()
        const blogToSendToAPI = {
            ...blog,
        }

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogToSendToAPI)
        })
            .then(() => {
                setEditModal(false)
            })
            .catch(error => console.log(error))

    }


    return (
        <>

            <form className="EditBlogForm">
                <div className="editModal">
                    <div className="overlay">
                        <div className="editModal-content">
                            <h2 className="BlogForm__title">Edit Blog Post</h2>
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="description">Title:</label>
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
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
                                    <div className="form-group">
                                        <label htmlFor="description">Body:</label>
                                        <textarea
                                            required autoFocus
                                            type="text"
                                            className="form-control"
                                            value={blog.post_body}
                                            onChange={
                                                (evt) => {
                                                    const copy = { ...blog }
                                                    copy.post_body = evt.target.value
                                                    setBlog(copy)
                                                }
                                            } />
                                    </div>
                                </fieldset>
                                <div className="form-group">
                                    <select defaultValue={blog.park_id}
                                        onChange={(event) => {
                                            const copy = { ...blog }
                                            copy.park_id = parseInt(event.target.value)
                                            setBlog(copy)
                                        }}
                                    >
                                        <option value="" disabled>Select a park</option>
                                        {parks.map((park) => {
                                            return (
                                                <option selected={park.id == blog.park_id ? true : false} key={park.id} value={park.id}>
                                                    {park.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <button className=".close-editModal" type="button" onClick={(e) => setEditModal(false)}>Cancel</button>
                                <button className="save-blog" onClick={handleSaveButtonClick}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}
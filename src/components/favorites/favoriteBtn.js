import { useState, useEffect } from "react";
import { fetchIt } from "../auth/fetchIt";
import { useNavigate } from "react-router-dom";
import "./favorites.css"

export const FavoriteBtn = ({resource, resource_id}) => {
    //state variables. lots of them. we have to compare the logged in user's favorites to the entire table of that resource. and there are four separate favorites tables, so.
    const [favEvents, setFavEvents] = useState([])
    const [favBlogs, setFavBlogs] = useState([])
    const [favParks, setFavParks] = useState([])
    const [favPhotos, setFavPhotos] = useState([])
    const [button, buttonPressed] = useState(false)
    const navigate = useNavigate()
    
    //some useEffects for fetch calls. we aren't rendering anything here except a button, but we'll use these for logic purposes.
    useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?events`)
          .then((data) => {
            setFavEvents(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?blogs`)
          .then((data) => {
            setFavBlogs(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?parks`)
          .then((data) => {
            setFavParks(data);
          });
      }, []);

      useEffect(() => {
        fetchIt(`http://localhost:8000/favorites?photos`)
          .then((data) => {
            setFavPhotos(data);
          });
      }, []);

      useEffect(() => {
        if (resource === "photos"){
        fetchIt(`http://localhost:8000/favorites?photos`)
          .then((data) => {
            setFavPhotos(data);
            buttonPressed(false)
          });} else if (resource==="parks"){
            fetchIt(`http://localhost:8000/favorites?parks`)
            .then((data) => {
              setFavParks(data);
              buttonPressed(false)
            });
          } else if (resource==="blogs"){
            fetchIt(`http://localhost:8000/favorites?blogs`)
            .then((data) => {
              setFavBlogs(data);
              buttonPressed(false)
            });
          }
      }, [button]);

    //POST and DELETE functions for the onClicks

    const createFavPhoto = (id) =>{
        const copy = { 
            photo_id: id
        }

        fetchIt(`http://localhost:8000/favorites`, {
            method: "POST",
            body: JSON.stringify(copy)
        }).then(() => {
            photoFavorite()
        })
    }

    const createFavEvent = () =>{
        
    }

    const createFavBlog = (id) =>{
      const copy = { 
        blog_id: id
    }

    fetchIt(`http://localhost:8000/favorites`, {
        method: "POST",
        body: JSON.stringify(copy)
    }).then(() => {
        blogFavorite()
    })
    }

    const createFavPark  = (id) =>{
      const copy = { 
          park_id: id
      }

      fetchIt(`http://localhost:8000/favorites`, {
          method: "POST",
          body: JSON.stringify(copy)
      }).then(() => {
          parkFavorite()
      })
  }

    const removeFavPhoto = (id) =>{
        const copy = {
            photo_id: id
        }

        fetchIt(`http://localhost:8000/favorites/32`, {
            method: "DELETE",
            body: JSON.stringify(copy)
        })
    }

    const removeFavEvent = (id) =>{
      const copy = {
          photo_id: id
      }

      fetchIt(`http://localhost:8000/favorites/32`, {
          method: "DELETE",
          body: JSON.stringify(copy)
      })
  }

    const removeFavBlog = (id) =>{
      const copy = {
          blog_id: id
      }

      fetchIt(`http://localhost:8000/favorites/32`, {
          method: "DELETE",
          body: JSON.stringify(copy)
      })
  }

    const removeFavPark = (id) =>{
      const copy = {
          park_id: id
      }

      fetchIt(`http://localhost:8000/favorites/32`, {
          method: "DELETE",
          body: JSON.stringify(copy)
      })
  }


    //this is the section where the [resource]Favorite functions live. They render the special buttons for each resource you can favorite
    const blogFavorite = () => {
          let arrayOfIds = []
          favBlogs.map((fav)=>{
            arrayOfIds.push(fav?.post?.id)
          })
          if(arrayOfIds.includes(resource_id)){
             return <><button className="favorite-btn" onClick={()=>{removeFavBlog(resource_id); buttonPressed(true)}}><p>Remove Blog from Favorites</p></button></>
          } else {
              return <><button className="favorite-btn" onClick={()=>{createFavBlog(resource_id); buttonPressed(true)}}><p>Add Blog to Favorites</p></button></>
            }
    }
    const photoFavorite = () =>{
                let arrayOfIds = []
                favPhotos.map((fav)=>{
                    arrayOfIds.push(fav?.photo?.id)
                })
                if(arrayOfIds.includes(resource_id)){
                    return <><button className="favorite-btn" onClick={()=>{removeFavPhoto(resource_id); buttonPressed(true)}}><p>Remove Photo from Favorites</p></button></>
                } else {
                    return <><button className="favorite-btn" onClick={()=>{createFavPhoto(resource_id); buttonPressed(true)}}><p>Add Photo to Favorites</p></button></>
                }
    }

    const parkFavorite = () =>{
        let arrayOfIds = []
          favParks.map((fav)=>{
            arrayOfIds.push(fav?.park?.id)
          })
          if(arrayOfIds.includes(resource_id)){
             return <><button className="favorite-btn" onClick={()=>{removeFavPark(resource_id); buttonPressed(true)}}><p>Remove Park from Favorites</p></button></>
          } else {
              return <><button className="favorite-btn" onClick={()=>{createFavPark(resource_id); buttonPressed(true)}}><p>Add Park to Favorites</p></button></>
            }

    }
    const eventFavorite = () =>{
        return <>
        <button className="favorite-btn"><p>Add Event to Favorites</p> </button>
        </>
    }

    //verifyFavorite figures out which function needs to be called, based on the resource prop
    const verifyFavorite = () => {
        if (resource === "photos"){
            return photoFavorite()
        } else if (resource === "events"){
            return eventFavorite()
        } else if (resource === "blogs"){
            return blogFavorite()
        } else if (resource === "parks"){
            return parkFavorite()
        }
    }

    return <>{
        verifyFavorite()
    }
    </>
}
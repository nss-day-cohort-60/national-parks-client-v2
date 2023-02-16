import { BlogFilter } from "./BlogFilter"
import { useState } from "react"
import { Blogs } from "./Blogs"
import { NavBar } from "../nav/NavBar"

export const BlogContainer = () => {
    const [ searchTerms, setSearchTerms ] = useState(" ")
    const [ blogs, setBlogs ] = useState([])

    return <>
         <header className="blogs-title"><h1>Blogs</h1></header>
        <BlogFilter searchSetterFunction={setSearchTerms} searchTerm={searchTerms} blogSetterFunction={setBlogs} blogs={blogs} />
        <Blogs searchTermsState={searchTerms} blogs={blogs}/>
    </>
}  
import { BlogFilter } from "../views/BlogFilter"
import { useState } from "react"
import { Blogs } from "./Blogs"
import { NavBar } from "../nav/NavBar"

export const BlogContainer = () => {
    const [ searchTerms, setSearchTerms ] = useState()

    return <>
        <NavBar />
        <BlogFilter setterFunction={setSearchTerms} />
        <Blogs searchTermsState={searchTerms}/>
    </>
}  
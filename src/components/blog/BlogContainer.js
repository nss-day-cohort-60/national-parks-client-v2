import { BlogFilter } from "../views/BlogFilter"
import { useState } from "react"
import { Blogs } from "./Blogs"

export const BlogContainer = () => {
    const [ searchTerms, setSearchTerms ] = useState()

    return <>
        <BlogFilter setterFunction={setSearchTerms} />
        <Blogs searchTermsState={searchTerms}/>
    </>
}  
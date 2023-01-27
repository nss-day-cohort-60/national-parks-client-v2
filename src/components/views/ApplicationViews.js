import { Route, Outlet, Routes } from "react-router-dom"
import { BlogContainer } from "../blog/BlogContainer"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/home" element={ <Outlet /> } />
			<Route path="blogs" element={ <BlogContainer /> } />
		</Routes>
	)
}

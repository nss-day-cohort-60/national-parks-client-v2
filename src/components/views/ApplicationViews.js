import { Route, Outlet, Routes } from "react-router-dom"
import { BlogContainer } from "../blog/BlogContainer"
import { ParkPage } from "../parks/ParkPage"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/home" element={ <Outlet /> } />
			<Route path="blogs" element={ <BlogContainer /> } />
			<Route path="parks/:park_id" element={ <ParkPage /> } />
		</Routes>
	)
}

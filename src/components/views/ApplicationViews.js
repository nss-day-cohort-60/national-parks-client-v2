import { NavBar } from "../nav/NavBar"
import { Landing } from "../landing/Landing"
import { ParkPage } from "../landing/ParkPage"
import { Route, Outlet, Routes } from "react-router-dom"
import { BlogContainer } from "../blog/BlogContainer"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<Outlet />
				</>
			}>
                <Route path="blogs" element={ 
					<>
					<BlogContainer />
					</>
				} />
				<Route path="/" element={ <Landing /> } />
				<Route path="home" element={ <Landing /> } />
				<Route path="parks/:park_id" element={ <ParkPage /> } />
			</Route>
		</Routes>
	)
}

import { NavBar } from "../nav/NavBar"
import { Landing } from "../landing/Landing"
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
				<Route path="home" element={ <Landing /> } />
			</Route>
		</Routes>
	)
}

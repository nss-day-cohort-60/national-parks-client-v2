import { Route, Outlet, Routes } from "react-router-dom"
import { BlogContainer } from "../blog/BlogContainer"
import { MyBlogs } from "../blog/MyBlogs";
import { ParkPage } from "../parks/ParkPage"

export const ApplicationViews = () => {
	return (
    <Routes>
      <Route path="/home" element={<Outlet />} />
      <Route path="/my-blogs" element={<MyBlogs />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Landing } from "./landing/Landing"
import { BlogContainer } from "./blog/BlogContainer"
import { ParkPage } from "./parks/ParkPage"


export const NationalParks = () => {
	return (
    <Routes>
      <Route path="/home" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<BlogContainer />} />
      <Route path="parks/:park_id" element={<ParkPage />} />
      <Route
        path="*"
        element={
          <Authorized>
            <>
              <ApplicationViews />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
}


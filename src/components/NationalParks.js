import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Register } from "./auth/Register"
import { Landing } from "./landing/Landing"
import { BlogContainer } from "./blog/BlogContainer"
import { ParkPage } from "./parks/ParkPage"
import { UserHub } from "./favorites/hub"
import { UserHub1 } from "./favorites/Hub1"


export const NationalParks = () => {
	return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<BlogContainer />} />
      <Route path="parks/:park_id" element={<ParkPage />} />
      <Route path="/hub" element={<UserHub />} />
      <Route path="/hub1" element={<UserHub1 />} />
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


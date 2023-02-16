import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { Register } from "./auth/Register"
import { Landing } from "./landing/Landing"
import { BlogContainer } from "./blog/BlogContainer"
import { ParkPage } from "./parks/ParkPage"
import { Calendar } from "./event/Calendar"
import { EventsContainer } from "./event/EventsContainer"


export const NationalParks = () => {
	return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<BlogContainer />} />
      <Route path="parks/:park_id" element={<ParkPage />} />
      <Route path="/calendar" element={<EventsContainer />} />
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


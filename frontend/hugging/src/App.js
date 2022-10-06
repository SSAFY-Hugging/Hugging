import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin.js";
import CounselorLogin from "./pages/counselor/CounselorLogin";
import RegisterCategory from "./pages/user/RegisterCategory";
import RegisterProfile from "./pages/user/RegisterProfile";
// import Navbar from "./components/ui/NavBar";
// import Nav from "./components/ui/Nav";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import MyCalendar from "./components/counselor/MyCalendar";
import Location from "./components/main/Location";
import RedirectUri from "./pages/user/RedirectUri";
import MediaView from "./pages/media/MediaView";
import MusicPlayingPage from "./pages/media/MusicPlayingPage";
import TopicMediaPage from "./pages/media/TopicMediaPage";
import ReserveCounsel from "./pages/counsel/ReserveCounsel";
import SelectCounsel from "./pages/counsel/SelectCounsel";
import CounselProfile from "./pages/counsel/CounselProfile";
import ListCounselor from "./pages/counsel/ListCounselor";
import MainPage from "./pages/main/MainPage";
import CounselorMypage from "./pages/counselor/CounselorMypage";
import CounselDone from "./pages/counsel/CounselDone";
import MissionStart from "./pages/mission/MissionStart";
import Timer from "./components/mission/Timer";
import MissionList from "./pages/mission/MissionList";
import MissionManagement from "./pages/mission/MissionManagement";
import { useState } from "react";
// import scrollbar from 'smooth-scrollbar';

// // smooth scroll 설정
// scrollbar.init(document.querySelector('#smooth-scroll'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("token") || false
  );
  return (
    <div className="App">
      {/* <Navbar/>
      <Nav/> */}
      {/* <Location></Location> */}
      <Routes>
        {/* <MyCalendar></MyCalendar> */}
        <Route path="/redirecturi" element={<RedirectUri />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/counselor/login" element={<CounselorLogin />} />
        <Route
          path="/counselor/mypage"
          element={
            isAuthenticated ? <CounselorMypage /> : <Navigate to="/login" />
          }
        />
        <Route path="/category" element={<RegisterCategory />} />
        <Route path="/profile" element={<RegisterProfile />} />
        <Route
          path="/recommend_media"
          element={isAuthenticated ? <MediaView /> : <Navigate to="/login" />}
        />
        <Route
          path="/playing_music/:musicId"
          element={
            isAuthenticated ? <MusicPlayingPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/TopicMediaPage/:categoryId"
          element={
            isAuthenticated ? <TopicMediaPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/counselreserve"
          element={
            isAuthenticated ? <ReserveCounsel /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<UserLogin />} />
        <Route
          path="/counselselect"
          element={
            isAuthenticated ? <SelectCounsel /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/counselprofile/:counselorId"
          element={
            isAuthenticated ? <CounselProfile /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/counselorlist"
          element={
            isAuthenticated ? <ListCounselor /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/counseldone"
          element={isAuthenticated ? <CounselDone /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/missionstart"
          element={
            isAuthenticated ? <MissionStart /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/missionlist"
          element={isAuthenticated ? <MissionList /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/mission/management"
          element={
            isAuthenticated ? <MissionManagement /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/main"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

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
import PrivateRoute from "./lib/PrivateRoute";
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

        <Route
          path="/location"
          element={
            <PrivateRoute>
              <Location />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <MyCalendar />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/counselor/login" element={<CounselorLogin />} />
        <Route
          path="/counselor/mypage"
          element={
            <PrivateRoute>
              <CounselorMypage />
            </PrivateRoute>
          }
        />
        <Route path="/category" element={<RegisterCategory />} />
        <Route path="/profile" element={<RegisterProfile />} />

        <Route
          path="/recommend_media"
          element={
            <PrivateRoute>
              <MediaView />
            </PrivateRoute>
          }
        />
        <Route
          path="/playing_music/:musicId"
          element={
            <PrivateRoute>
              <MusicPlayingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/TopicMediaPage/:categoryId"
          element={
            <PrivateRoute>
              <TopicMediaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselreserve"
          element={
            <PrivateRoute>
              <ReserveCounsel />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserLogin />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselselect"
          element={
            <PrivateRoute>
              <SelectCounsel />
            </PrivateRoute>
          }
        />

        <Route
          path="/counselprofile/:counselorId"
          element={
            <PrivateRoute>
              <CounselProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselreserve"
          element={
            <PrivateRoute>
              <ReserveCounsel />
            </PrivateRoute>
          }
        />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/counselorlist"
          element={
            <PrivateRoute>
              <ListCounselor />
            </PrivateRoute>
          }
        />
        <Route
          path="/counseldone"
          element={
            <PrivateRoute>
              <CounselDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/missionstart"
          element={
            <PrivateRoute>
              <MissionStart />
            </PrivateRoute>
          }
        />
        <Route
          path="/timer"
          element={
            <PrivateRoute>
              <Timer />
            </PrivateRoute>
          }
        />
        <Route
          path="/missionlist"
          element={
            <PrivateRoute>
              <MissionList />
            </PrivateRoute>
          }
        />
        <Route
          path="/mission/management"
          element={
            <PrivateRoute>
              <MissionManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

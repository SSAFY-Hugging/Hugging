import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import UserLogin from './user/UserLogin.js'
import CounselorLogin from './counselor/CounselorLogin';
import RegisterCategory from './user/RegisterCategory';
import RegisterProfile from './user/RegisterProfile';
import Navbar from './components/NavBar';
import Nav from './components/Nav'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MyCalendar from './components/MyCalendar';
import Location from './components/Location';
import RedirectUri from './user/RedirectUri';
// import scrollbar from 'smooth-scrollbar';

// // smooth scroll 설정
// scrollbar.init(document.querySelector('#smooth-scroll'));

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Nav/>
       {/* <Location></Location> */}
      <Routes>
        {/* <MyCalendar></MyCalendar> */}
        <Route path="/redirecturi" element={<RedirectUri/>}></Route>
        <Route path="/location" element={<Location/>}></Route>
        <Route path="/calendar" element={<MyCalendar/>}></Route>
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/counselor/login" element={<CounselorLogin/>} />
        <Route path="/category" element={<RegisterCategory/>} />
        <Route path="/profile" element={<RegisterProfile/>} />
        <Route path="/profile_img" element={ <></>}></Route>
      </Routes>
    </div>
  );
}

export default App;

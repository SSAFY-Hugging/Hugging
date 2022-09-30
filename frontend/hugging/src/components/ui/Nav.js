import styled from "styled-components";
import styles from './Nav.module.css'
import '../../App.css';
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate()
    return (
        <div className={styles.app}>
          <div className={styles.nav}>
            <button className={styles.home_btn} onClick={() => {
          navigate("/");
        }}><i className="xi-home-o xi-2x" style={{ color:'white'}}></i></button>
           <button className={styles.nav_btn} onClick={() => {
          navigate("/")}}><svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="#ADA4A5" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <p className={styles.nav_btn_title}>home</p>
        </button>
           <button className={styles.nav_btn} onClick={() => {
          navigate("/recommend_media")}}><svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ADA4A5" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
            <p className={styles.nav_btn_title}>music</p></button>
            {/* <NavBtn><i className="xi-music xi-2x" style={{ color:'#ADA4A5'}}></i><NavBtnTitle>music</NavBtnTitle></NavBtn> */}
            <button className={styles.nav_btn} onClick={() => {
          navigate("/recommend_media")}}><i className="xi-maker xi-2x" style={{ color:'#E19CD9'}}></i><p className={styles.nav_btn_title}>location</p></button>
            <button className={styles.nav_btn}><i className="xi-profile-o xi-2x" style={{ color:'#ADA4A5'}}></i><p className={styles.nav_btn_title}>my</p></button>
          </div>
        </div>
    )
}

export default Nav;
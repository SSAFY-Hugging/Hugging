import './RegisterCategory.module.css';
import {React,  useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { changeEmotion } from '../../store';
import styles from './RegisterCategory.module.css'
import axios from 'axios'

function RegisterCategory({history}) {
    const navigate = useNavigate();
    let dispatch = useDispatch()

    return (
        <>
        <div className={styles.category_title}><h2 className={styles.hug}>Hug</h2><h2>ging</h2></div>
        <div className={styles.order}>           
        </div>
        <div className={styles.writing}>
            <p className={styles.gomin}>고민</p><p className={styles.category}>category</p> 
        </div>
        <div id={styles.category_card}>
            <button onClick={()=>{ dispatch(changeEmotion("rage"))}}>불안할 때</button>
            <button onClick={()=>{ dispatch(changeEmotion("happy"))}}>불안할 때</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
        </div>
        <button className={styles.counselor_login_btn} onClick={()=>{navigate("/profile")}}>다음</button>
       </>
    )
}

export default RegisterCategory;
import './RegisterCategory.module.css';
import {React,  useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { changeEmotion, deleteEmotion } from '../../store';
import styles from './RegisterCategory.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useState } from 'react';

function RegisterCategory({history}) {
    const navigate = useNavigate();
    let dispatch = useDispatch()
    let user = useSelector((state)=> { return state.user})
    let [btn, setBtn] = useState(false)
    let [emotion, setEmotion] = useState([])
    
    useEffect(()=>{
                // let emotion = localStorage.getItem('emotion')               
                // emotion = JSON.parse(emotion)                
                // emotion.push('rage')
                // console.log(emotion)
                // localStorage.setItem('emotion', JSON.stringify('rage'))

    },[])
    return (
        <>
        <div className={styles.category_title}><h2 className={styles.hug}>Hug</h2><h2>ging</h2></div>
        <div className={styles.order}>           
        </div>
        <div className={styles.writing}>
            <p className={styles.gomin}>고민</p><p className={styles.category}>category</p> 
        </div>
        <div id={styles.category_card}>
            <button onClick={()=>{ 
                if ( btn === false ) {
                    emotion.push("슬픔")
                    setEmotion(emotion)
                    // dispatch(changeEmotion("슬픔"))
                }
                else{
                emotion.map(function(a, i){
                    if (emotion[i] === "슬픔") {
                        emotion.splice(i, 1)
                    }

                })
                          }
                setBtn(!btn)
                console.log(user)
                console.log(emotion)
                console.log(btn)
                // let emotion = localStorage.getItem('emotion')
                // emotion = JSON.parse(emotion)
                // emotion.concat('rage')
                // localStorage.setItem('emotion', JSON.stringify('rage'))
                // console.log(emotion)
            }}>불안할 때</button>
            <button onClick={()=>{  
                if ( btn === false ) {
                    emotion.push("우울함")
                    setEmotion(emotion)
                }
                else{
                    emotion.map(function(a, i){
                        if (emotion[i] === "우울함") {
                            emotion.splice(i, 1)}
                         })
                console.log(emotion) 
                setBtn(!btn)}}}
                          >우울함</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
            <button>불안할 때</button>
            <div></div>
        </div>
        <button className={styles.counselor_login_btn} onClick={()=>{navigate("/profile")}}>다음</button>
       </>
    )
}

export default RegisterCategory;
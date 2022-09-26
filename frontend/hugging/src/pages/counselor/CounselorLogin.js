import styles from './CounselorLogin.module.css'
import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginCounselor } from '../../store';

function CounselorLogin() {

    let dispatch = useDispatch()
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    
    let LoginFunc = (e) => {
        e.preventDefault();
        if (!inputId) {
          return alert("ID를 입력하세요.");
        }
        else if (!inputPw) {
          return alert("Password를 입력하세요.");
        }
        else {
            let body = {
              inputId,
              inputPw,
            };
        
            axios.post("Endpoint", body)
            .then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                console.log("로그인");
                dispatch(loginCounselor(res.data.userInfo));
            }});

    }}
    return (
        <div className={styles.counselor}>

        <div className={styles.counselor_title}>
        <h1 className={styles.header__title2}>Hug</h1><h1 className={styles.header__title3}>ging</h1>
        </div> 
        <p className={styles.counselor_text}>상담사 로그인</p>
        <form id={ styles.login_form} onSubmit={ LoginFunc }>
            <input type="text" placeholder='Email' onChange={ handleInputId }></input>
            <input type="text" placeholder='Password' onChange={ handleInputPw } />
            <p className={styles.forgot_text}>Forgot your password?</p>
            <button type='submit' className={styles.counselor_login_btn}>로그인</button>
        </form>
   
        
        </div>
    )
}

export default CounselorLogin;
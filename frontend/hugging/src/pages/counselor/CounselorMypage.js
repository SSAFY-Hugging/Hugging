import React from 'react';
import styles from './CounselorMypage.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginCounselor } from '../../store';
import Calendar from '../../components/counselor/MyCalendar';
import Star from '../../components/counselor/Star'
import Calendargrass from '../../components/counselor/CalendarGrass'

function CounselorMypage() {

    const [clicked, setClicked] = useState([false, false, false, false, false]);

    return (
        <>
          <div className={styles.Nav}><h6 className={styles.counselor_title}>상담사 페이지</h6></div>      
            <div className={styles.counselor_card}>
                <div className={styles.counselor_img}></div>
                <div className=''><span className={styles.counselor_name}>조성규 상담사 </span> </div>
                <div className={styles.counselor_card_item}> <span className={styles.counselor_card_item_text}>가능 시간</span><span>평일</span>  </div>
                <div><span className={styles.counselor_card_item_text}>자격증</span><span>상담심리사 2급</span></div>
                <div><span className={styles.counselor_card_item_text}>전문분야</span><span>우울</span></div>
                <div><Star/></div>
                <div><span className={styles.counselor_card_item_text}>주요 자격 및 경력</span></div>
                <div><span className={styles.counselor_card_item_text}>상담사 이야기</span></div>
            </div>

            <Calendar/>
            <Calendargrass/>
        </>
    )
}

export default CounselorMypage;
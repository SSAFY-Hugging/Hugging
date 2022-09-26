import React from 'react';
import styles from'./Recommend.module.css';

function Recommend () {
  return (
    <>
    <div>
      <div className={styles.Title}>
        <h3 className={styles.TitleText}>맞춤 추천</h3>
        <img src='./guitar.png' alt='guitar' className={styles.TitleImage}></img>
      </div>
      <div className={styles.List}>
        <div className={styles.Meditation}>
          <img src='./music.png' alt='music' className={styles.MusicImage}></img>
          <p className='MeditationText'>집중력 향상을 위한 아침 명상</p>
        </div>
        <div className={styles.Meditation}>
          <img src='./music.png' alt='music' className={styles.MusicImage}></img>
          <p className='MeditationText'>집중력 향상을 위한 아침 명상</p>
        </div>
        <div className={styles.Meditation}>
          <img src='./music.png' alt='music' className={styles.MusicImage}></img>
          <p className='MeditationText'>집중력 향상을 위한 아침 명상</p>
        </div>
        <div className={styles.Meditation}>
          <img src='./music.png' alt='music' className={styles.MusicImage}></img>
          <p className='MeditationText'>집중력 향상을 위한 아침 명상</p>
        </div>   
      </div>

    </div>

    
    </>
  );
  
  
}

export default Recommend;

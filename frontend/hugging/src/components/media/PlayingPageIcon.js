import React from 'react';
import styles from './PlayingPageIcon.module.css'





function PlayingPageIcon () {
  return (
    <>
    <div className={styles.Icon}>
      <img src='./Heart.png' alt='image' className={styles.image}></img>
      <img src='./X.png' alt='image' className={styles.image}></img>
    </div>
    </>
  );

  
}

export default PlayingPageIcon;
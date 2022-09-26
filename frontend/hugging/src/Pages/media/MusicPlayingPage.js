import React from 'react';
import styles from './MusicPlayingPage.module.css'
import PlayingPageIcon from '../../components/media/PlayingPageIcon';
import PlayingText from '../../components/media/PlayingText';
import PlayingMusic from '../../components/media/PlayingMusic';



function MusicPlayingPage () {

  return (
    <div className={styles.Page}>
      <div className='container'>
        <PlayingPageIcon/>
        <PlayingText/>
        <PlayingMusic/>
      </div>
    </div>

    
  )


}



export default MusicPlayingPage;
import React, { useEffect, useState } from "react";
import styles from "./MusicPlayingPage.module.css";
import PlayingPageIcon from "../../components/media/PlayingPageIcon";
import PlayingMusic from "../../components/media/PlayingMusic";
import { useParams, useNavigate } from "react-router-dom";
import { API_HOST_URL } from "../../config/index";
function MusicPlayingPage() {
  const params = useParams();

  const Url = API_HOST_URL + "musics/" + params.musicId;

  return (
    <div className={styles.Page}>
      <div className="container">
        <PlayingPageIcon />
        <PlayingMusic url={Url} />
      </div>
    </div>
  );
}

export default MusicPlayingPage;

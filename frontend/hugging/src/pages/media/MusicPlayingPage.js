import React, { useEffect } from "react";
import styles from "./MusicPlayingPage.module.css";
import PlayingPageIcon from "../../components/media/PlayingPageIcon";
import PlayingMusic from "../../components/media/PlayingMusic";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../config/index";

import axios from "axios";
function MusicPlayingPage() {
  const params = useParams();

  const Url = API_HOST_URL + "musics/" + params.musicId;
  useEffect(() => {
    axios({
      method: "PUT",
      url: Url,
    }).then((res) => res);
  }, []);

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

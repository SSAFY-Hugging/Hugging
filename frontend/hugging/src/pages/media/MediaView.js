import React, { useEffect, useState } from "react";

import TopMusic from "../../components/media/TopMusic";

import Recommend from "../../components/media/Recommend";
import Topic from "../../components/media/Topic";

import Navbar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";

import { API_HOST_URL } from "../../config/index";

function MediaView() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    fetch("../../music.json")
      .then((res) => res.json())
      .then((result) => {
        setMusics(result);
      });
  }, []);
  const [topicmusics, setTopicMusics] = useState([]);

  useEffect(() => {
    fetch(`${API_HOST_URL}musics/category`)
      .then((res) => res.json())
      .then((result) => {
        setTopicMusics(result.data);
      });
  }, []);
  const [topmusics, setTopMusics] = useState([]);

  useEffect(() => {
    fetch(`${API_HOST_URL}musics/getTophits`)
      .then((res) => res.json())
      .then((result) => {
        setTopMusics(result.data);
      });
  }, []);

  return (
    <div>
      <Nav/>
      <Navbar/>
      <Recommend musicdatas={musics} />
      <TopMusic topmusicdatas={topmusics} />
      <Topic topicdatas={topicmusics} />
    </div>
  );
}

export default MediaView;

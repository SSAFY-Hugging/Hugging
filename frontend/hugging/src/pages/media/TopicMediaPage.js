import React, { useEffect, useState } from "react";
import TopicMedia from "../../components/media/TopicMedia";
import Navbar from "../../components/ui/NavBar";
import Nav from "../../components/ui/Nav";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../config/index";
function TopicMediaPage() {
  const params = useParams();
  const [musics, setMusics] = useState([]);
  const url = API_HOST_URL + "musics/category/" + params.categoryId;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log("여기 출력");
        console.log(result.data);
        setMusics(result.data);
      });
  }, []);

  return (
    <div>
      {<Nav />}
      {<Navbar />}
      {<TopicMedia musicdatas={musics} />}
    </div>
  );
}

export default TopicMediaPage;

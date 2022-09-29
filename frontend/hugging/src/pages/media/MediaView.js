import React from "react";

import TopMusic from "../../components/media/TopMusic";

import ToggleButton from "../../components/media/ToggleButton";
import Recommend from "../../components/media/Recommend";
import Topic from "../../components/media/Topic";

function MediaView() {
  return (
    <div>
      <ToggleButton />
      <Recommend />
      <TopMusic />
      <Topic />
    </div>
  );
}

export default MediaView;

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./Stamp.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from "axios";
let Wrap = styled.div`
  /* margin: 5% auto;
  width: 100%; */
  .slick-arrow {
    display: flex;
    z-index: 100;
    width: 5px;
    height: 5px;
  }

  .slick-prev {
    left: -1.2vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }

  .slick-next {
    right: -1.1vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }
`;
export default function Stamp() {
  const settings = {
    infinite: false,
    arrow: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 3,
    slidesToScroll: 1,
    dots: true,
  };
  let userprofile = localStorage.getItem("userprofile");
  userprofile = JSON.parse(userprofile);
  let memberId = userprofile.id;
  axios
    .get("https://j7b204.p.ssafy.io/api/missions/stamp/" + memberId)
    .then((res) => {
      console.log(res);
      localStorage.setItem("stamp", JSON.stringify(res.data.data));
    });
  let stamp = localStorage.getItem("stamp");
  stamp = JSON.parse(stamp);
  return (
    <div>
      <Wrap>
        <Slider {...settings}>
          <div>
            <CalendarHeatmap
              startDate={new Date("2022-01-01")}
              endDate={new Date("2022-03-31")}
              values={stamp}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          </div>
          <div>
            <CalendarHeatmap
              startDate={new Date("2022-04-01")}
              endDate={new Date("2022-06-30")}
              values={stamp}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          </div>
          <div>
            <CalendarHeatmap
              startDate={new Date("2022-07-01")}
              endDate={new Date("2022-09-30")}
              values={stamp}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          </div>
          <div>
            <CalendarHeatmap
              startDate={new Date("2022-10-01")}
              endDate={new Date("2022-12-31")}
              values={stamp}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
          </div>
        </Slider>
      </Wrap>
    </div>
  );
}

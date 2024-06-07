import React from "react";
import { Carousel } from "antd";
import SliderFirst1 from "../../img/SliderFirst1.jpg";
import SliderSecond1 from "../../img/SliderSecond1.jpg";
import SliderThree1 from "../../img/SliderThree1.jpg";

const contentStyle = {
  margin: 0,
  height: "150px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "15px",
  overflow: "hidden",
  
};

function SliderImg(props) {
  return (
    <>
      <div className="px-[4.6875rem] mt-[48px] w-full md:w-[80%]">
        <Carousel style={contentStyle} autoplay className="w-full">
          <div className="relative h-64 sm:h-96 lg:h-120 xl:h-150">
            <img
              src={SliderFirst1}
              alt=""
              className="absolute inset-0 object-cover w-full h-full rounded-2xl"
            />
          </div>

          <div className="relative h-64 sm:h-96 lg:h-120 xl:h-150">
            <img
              src={SliderSecond1}
              alt=""
              className="absolute inset-0 object-cover w-full h-full rounded-2xl"
            />
          </div>

          <div className="relative h-64 sm:h-96 lg:h-120 xl:h-150">
            <img
              src={SliderThree1}
              alt=""
              className="absolute inset-0 object-cover w-full h-full rounded-2xl"
            />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default SliderImg;

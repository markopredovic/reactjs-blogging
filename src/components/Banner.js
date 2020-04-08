import React from "react";
import homeBanner from "../assets/images/banner-temp.jpg";

const Banner = () => {
  return (
    <div className="m-banner mb-5">
      <div className="l-img">
        <img src={homeBanner} alt="banner" />
      </div>
      <div className="l-content-wrapper">
        <div className="l-content text-center">
          <h3 className="mb-2 text-uppercase">Title</h3>
          <p>subtitle</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;

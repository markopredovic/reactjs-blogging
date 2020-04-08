import React, { Fragment } from "react";
import HomeLayout from "../../components/UI/HomeLayout";
import Banner from "../Banner";
import HomeIntro from "../HomeIntro";

const HomePage = () => {
  return (
    <Fragment>
      <HomeLayout>
        <Banner />
        <HomeIntro />
      </HomeLayout>
    </Fragment>
  );
};

export default HomePage;

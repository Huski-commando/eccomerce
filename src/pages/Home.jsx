import React from "react";
import { Carousel, Title } from "../components";

const Home = () => {
  return (
    <>
      <Title title="Home Page" />
      <div className="md:mt-28">
        <Carousel />
      </div>
    </>
  );
};

export default Home;

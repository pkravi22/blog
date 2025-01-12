import React from "react";
import Hero from "./Hero";
import AlllBlogs from "./AlllBlogs";
import Blogs from "./Blogs";
const Home = () => {
  return (
    <div className="pt-16">
      <div>
        <Hero />
        <Blogs/>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const LatestBlogs = ({ blogs }) => {
  const bloggs = blogs.slice(0, 6);
  return (
    <div>
      <h1 className="text-xl font-semibold">Latest Blogs</h1>
      <div className="flex flex-col gap-4 text-sm ">
        {bloggs.map((latest) => {
          return (
            <div key={latest.id} className=" flex flex-col gap-2 border-b py-2">
              <div className="flex items-center gap-4">
              <img src={latest.image} alt="" className="w-20" />
              <h2>{latest.title.slice(0, 40)}..</h2>
              </div>
              
              <div className='bg-black text-white p-1 w-[100px]'>
              <Link  to={`/blog/${latest.id}`}>Read More</Link></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestBlogs;

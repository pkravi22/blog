import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import Populer from "./Populer";
import LatestBlogs from "./LatestBlogs";
const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const SelectCategory = (category) => {
    setSelectedCategory(category);
  };
  console.log(selectedCategory);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5004/blogs`);
        const blogs = await response.json();
        console.log("Fetched Blogs:", blogs);
        setBlogs(blogs);
        if (Array.isArray(blogs)) {
          const uniqueCategories = [
            ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
          ];
          console.log("Unique Categories:", uniqueCategories);
          setCategories(uniqueCategories);
        } else {
          console.error("Invalid API response:", blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-2 px-4 relative flex flex-col">
      {/*   //categories*/}

      <div className="  ">
        <div className="  flex gap-0 justify-center items-center overflow-x-auto scrollbar-hide ">
          {categories.map((category) => (
            <div key={category} className="">
              <button
                onClick={() => SelectCategory(category)}
                className={`px-4 py-2 font-bold bg-white hover:text-orange-400 border my-2  text-${
                  selectedCategory && "orange"
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
        <div className="flex  flex-col lg:flex-row gap-4 ">
            <div className=" w-full lg:w-3/4">
            <BlogCard selected={selectedCategory} blogs={blogs} />
            </div>
          
          <div className="flex flex-col w-full md:w-1/4 mt-16">
            <Populer blogs={blogs} />
            <LatestBlogs blogs={blogs}/>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Blogs;

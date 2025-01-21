import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Populer from "./Populer";
import LatestBlogs from "./LatestBlogs";

const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const SelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Show loader when fetching begins
      try {
        const response = await fetch(`https://blog-ung5.onrender.com/blogs`);
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
      } finally {
        setLoading(false); // Hide loader when fetching completes
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-2 px-4 relative flex flex-col">
      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-orange-400"></div>
          <p className="text-lg ml-4">Fetching blogs for you...</p>
        </div>
      ) : (
        <>
          {/* Categories */}
          <div className="flex gap-0 justify-center items-center overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <div key={category}>
                <button
                  onClick={() => SelectCategory(category)}
                  className={`px-4 py-2 font-bold bg-white hover:text-orange-400 border my-2 ${
                    selectedCategory === category ? "text-orange-400" : ""
                  }`}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>

          {/* Blog List */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-3/4">
              <BlogCard selected={selectedCategory} blogs={blogs} />
            </div>
            <div className="flex flex-col w-full md:w-1/4 mt-16">
              <Populer blogs={blogs} />
              <LatestBlogs blogs={blogs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;

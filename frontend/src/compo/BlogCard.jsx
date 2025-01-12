import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
const BlogCard = ({ selected, blogs }) => {
  const blogsToRender =
    selected !== null
      ? blogs.filter((blog) => blog.category === selected)
      : blogs;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 12; // Define items per page

  useEffect(() => {
    const totalCards = blogsToRender.length;
    const pages = Math.ceil(totalCards / itemsPerPage);
    setTotalPages(pages);
  }, [blogsToRender]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginate blogsToRender based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogsToRender.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  //const [id,setId]=useState(null);
 const handdleClick=(id)=>{
  console.log("clicked"+id);
  //setId(id)
 }

  return (
    <>
      <div className="flex gap-8 flex-wrap justify-center mt-20 shadow-md">
        {paginatedBlogs.map((blog) => (
          <div key={blog.id} className="w-full md:w-1/5">
            <div className="flex flex-col gap-4 rounded-md border border-gray-200 p-2">
              <img src={blog.image} alt="" className="rounded-md" />
              <h2 className="blog-card__title font-semibold text-md">
                {blog.title}
              </h2>
              <div className="flex gap-2">
                <IoMdPerson className="text-lg" />
                <p className="text-sm">{blog.author}</p>
              </div>
              <p className="text-sm">{blog.published_date}</p>
              <p className="text-sm">{blog.reading_time}</p>
              
              <Link  to={`/blog/${blog.id}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
     
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BlogCard;

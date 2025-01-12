
import React, { useState } from 'react';

//import { blogs } from '/api/blogsData.json'; // Import your blogs array
import BlogDetails from './BlogDetails';
import BlogCard from './BlogCard';

const Alllblogs = () => {
   
    
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [selectedBlogId, setSelectedBlogId] = useState(null);
    
      const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];
      const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter((blog) => blog.category === selectedCategory);
    
      const selectedBlog = blogs.find((blog) => blog.id === selectedBlogId);
    
      return (
        <div>
          {!selectedBlogId ? (
            <>
              <div>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      margin: '5px',
                      backgroundColor: selectedCategory === category ? '#007bff' : '#f0f0f0',
                      color: selectedCategory === category ? 'white' : 'black',
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} onClick={setSelectedBlogId} />
                ))}
              </div>
            </>
          ) : (
            <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlogId(null)} />
          )}
        </div>
      );
    };
    
    
    
export default Alllblogs
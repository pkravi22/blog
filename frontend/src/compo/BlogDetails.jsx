import React from 'react';

const BlogDetails = ({ blog, onBack }) => (
  <div>
    <button onClick={onBack}>Back</button>
    <h1>{blog.title}</h1>
    <p>By {blog.author} | {blog.published_date} | {blog.reading_time}</p>
    <img src={blog.image} alt={blog.title} style={{ width: '100%' }} />
    <p>{blog.content}</p>
    <div>
      Tags: {blog.tags.map((tag, index) => (
        <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
      ))}
    </div>
  </div>
);

export default BlogDetails;

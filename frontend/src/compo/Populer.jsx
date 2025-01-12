import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const Populer = ({blogs}) => {
 const bloggs=blogs.slice(0,6);
  return (
    <div>
        <h1 className='text-xl font-semibold'>Populer Blogs</h1> 
        <div className='flex flex-col gap-2 text-sm border-b '>
      {bloggs.map((populerBlog)=>{
        return (
            <div className='border-b py-2'>
            <div key={populerBlog.id} className=''>
                <h2>{populerBlog.title}</h2>
                <p>{populerBlog.read_time}</p>
            </div>
            <div className='bg-black text-white p-1 w-[100px]'>
            <Link  to={`/blog/${populerBlog.id}`}>Read More-{'>'}</Link>
            </div>
            </div>
        )
      })}
      </div>
        </div>
   
  )
}

export default Populer
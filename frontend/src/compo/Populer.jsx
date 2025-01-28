import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const Populer = ({blogs}) => {
 const bloggs=blogs.slice(0,6);
  return (
    <div>
        <h1 className='text-2xl font-semibold'>Populer Blogs</h1> 
        <div className='flex flex-col gap-4 text-sm border-b '>
      {bloggs.map((populerBlog)=>{
        return (
            <div className='flex items-center gap-4 border-b py-2'>
              <div>
                <img src={populerBlog.image} alt="" className='w-20'/>
              </div>
            <div key={populerBlog.id} className=''>
                <h2>{populerBlog.title.slice(0,40)}</h2>
                <p>{populerBlog.read_time}</p>
            </div>
            
            <div className='bg-black text-white p-2 rounded-lg w-[100px]'>
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
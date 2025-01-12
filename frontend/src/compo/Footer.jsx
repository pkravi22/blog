import React from 'react'
import react from "../assets/react.svg"
const Footer = () => {
  return (
    <>
    <footer className="footer flex flex-col md:flex-row justify-between  bg-black text-orange-500 py-16 px-8">
        <img src={react} alt="" className='w-[200px]' />
        <div>
            <h1 className='font-semibold text-md'>Services</h1>
            <p>Blog </p>
            <p>News</p>
            <p>Sports</p>
            <p>Entertainement</p>
        </div>
        <div>
            <h1 className='font-semibold text-md'>Other Links</h1>
            <p>Blog </p>
            <p>News</p>
            <p>Sports</p>
            <p>Entertainement</p>
        </div>
        <div className='border border-orange-400 p-2 h-[60px] rounded-sm '>
            <input type="email" className='p-2 rounded-sm outline-none' placeholder='Enter Your Email' />
            <button className='p-2 border-2 border-orange-400  '>Subscribe</button>
        </div>
    </footer>
    </>
  )
}

export default Footer
import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
const Header = () => {
const [open,setOpen]=useState(false);
  const handleMenu=()=>{
   setOpen((prev)=>!prev)
  }
  return (
    <>
      <header className="bg-orange-50 text-black  shadow-white shadow-sm flex justify-between fixed w-full p-2  z-10 ">
        <div>
          <img src={logo} alt="" srcset="" className="w-[150px]" />
        </div>
        <nav className={` ${open ?"flex flex-col":"hidden"}  items-center justify-center sm:flex`}>
          <ul className={`  ${open ?" flex-col":""} flex gap-8  `}>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/" className="nav-link ">
                Home
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/" className="nav-link ">
                Blogs
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/jobs" className="nav-link ">
                jobs
              </Link>
            </li>
            <li className="nav-item  hover:text-orange-500 active">
              <Link to="/about" className="nav-link">
                about
              </Link>
            </li>
            <li className="nav-item  hover:text-orange-500 active">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item  hover:text-orange-500 active">
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </li>
            <li className="nav-item  hover:text-orange-500 active">
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="sm:hidden">
          <div onClick={handleMenu} className={`${open?"text-red-400 ":""} text-3xl my-1`}>
            {open ?"Close":"Menu"}
         
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

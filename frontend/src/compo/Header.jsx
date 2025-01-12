import React, { useState } from "react";
import react from "../assets/react.svg";
import { Link } from "react-router-dom";
const Header = () => {
const [open,setOpen]=useState(false);
  const handleMenu=()=>{
   setOpen((prev)=>!prev)
  }
  return (
    <>
      <header className="bg-black text-white  shadow-white shadow-sm flex justify-between fixed w-full p-4  z-10 ">
        <div>
          <img src={react} alt="" srcset="" />
        </div>
        <nav className={` ${open ?"flex flex-col":"hidden"}  sm:flex`}>
          <ul className={`   flex gap-8  `}>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/" className="nav-link ">
                Home
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
          <div onClick={handleMenu}>
            {open ?"close":"Menu"}
         
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

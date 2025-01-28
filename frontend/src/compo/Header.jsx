import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/userContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Ensure AuthContext is correctly imported
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Update context state
    navigate("/"); // Redirect to Home
  };

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  // Ensure menu is closed on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="bg-orange-50 text-black shadow-white shadow-sm flex justify-between fixed w-full font-bold p-2 z-10">
        <div>
          <img src={logo} alt="Logo" className="w-[150px]" />
        </div>
        <nav className={` ${open ? "flex flex-col" : "hidden"} items-center justify-center sm:flex`}>
          <ul className={` ${open ? "flex-col" : ""} flex gap-8`}>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/" className="nav-link">
                Blogs
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/bytes" className="nav-link">
                Bytes
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item hover:text-orange-500 active">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            {!isAuthenticated && (
              <div className="flex flex-col md:flex-row gap-4">
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </div>
            )}
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        <nav className="sm:hidden">
          <div onClick={handleMenu} className={`${open ? "text-red-400" : ""} text-3xl my-1`}>
            {open ? "Close" : "Menu"}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

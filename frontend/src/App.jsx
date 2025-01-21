import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./compo/Layout";
import Home from "./compo/Home";
import About from "./compo/About";
import Footer from "./compo/Footer";
import Contact from "./compo/Contact";
import SpeciFicBlog from "./compo/SpeciFicBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Job from "./pages/Job";
import Bytes from "./pages/Bytes";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  element={<Layout />} >
            <Route path="/" index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/blog/:id" element={<SpeciFicBlog/>}/>
            <Route path="/jobs" element={<Job/>}/>
            <Route path="/bytes" element={<Bytes/>}/>

          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;

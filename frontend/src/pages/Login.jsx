import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/userContext";
//import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext); // Access login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login button");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      console.log(data);
      login(data.token); // Update authentication state
      navigate("/"); // Redirect to Home
      console.log("Response:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-black shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <h2 className="text-center text-xl font-semibold text-orange-500">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded shadow-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded shadow-md outline-none"
          />
          <button type="submit" className="p-2 border rounded text-orange-600 cursor-pointer">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

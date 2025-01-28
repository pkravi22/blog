import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/userContext";
const Logout = () => {
  const navigate = useNavigate();
//const {setUser}=useContext(AuthContext);
    const { logout } = React.useContext(AuthContext);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Are you sure you want to log out?
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Sesuaikan path

function Navbar() {
  const { auth, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Update context dan clear SecureStorage
    navigate("/"); // Arahkan ke halaman login
  };

  return (
    <div className="navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-8 text-lg flex justify-between items-center">
      <p className="font-bold">Admin Panel</p>

      {/* Menampilkan nama pengguna jika logged in */}
      {auth?.username ? (
        <div className="flex items-center gap-4">
          <p className="font-medium">Selamat datang, {auth.username}</p>
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          {/* Kosong atau tampilkan sesuatu jika tidak logged in */}
        </div>
      )}
    </div>
  );
}

export default Navbar;

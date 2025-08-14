import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Sesuaikan path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext); // Ambil fungsi login dari context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_LOKAL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Simpan ke context (yang juga simpan ke SecureStorage)
        login({
          token: data.token,
          username: data.username, // Asumsi API mengembalikan username
        });

        // Arahkan ke halaman setelah login sukses
        navigate("/add-song");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error while logging in");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md mt-4 cursor-pointer"
          >
            Login
          </button>
          <p className="font-bold pt-2 cursor-pointer">Create Account</p>
        </form>
      </div>
    </div>
  );
}

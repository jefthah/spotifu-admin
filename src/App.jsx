import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Sesuaikan path

export const url = import.meta.env.VITE_API_URL;

function PrivateRoute({ element }) {
  const { auth } = React.useContext(AuthContext);
  return auth?.token ? element : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ auth }) => (
          <div className="flex items-start min-h-screen">
            <ToastContainer />
            <Sidebar />
            <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
              <Navbar />
              <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
                <Routes>
                  <Route
                    path="/"
                    element={auth?.token ? <Navigate to="/add-song" /> : <Login />}
                  />
                  <Route path="/add-song" element={<PrivateRoute element={<AddSong />} />} />
                  <Route path="/add-album" element={<PrivateRoute element={<AddAlbum />} />} />
                  <Route path="/list-song" element={<PrivateRoute element={<ListSong />} />} />
                  <Route path="/list-album" element={<PrivateRoute element={<ListAlbum />} />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;

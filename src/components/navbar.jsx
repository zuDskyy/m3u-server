import React from "react";
import zplayer from "../assets/z-playerLogo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0f172a]/70 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={zplayer} alt="logo" className="w-10 h-10 rounded-full" />
          <div className="text-xl font-bold font-[Play]">
            ZIPTV <span className="text-blue-400">Player</span>
          </div>
          <span className="ml-2 text-sm text-gray-300">v1.0</span>
        </div>
        <ul className="flex gap-6 text-2xl">
          <li className="hover:text-blue-400 transition">
            <Link to="/">🏠 Home</Link>
          </li>
          <li className="hover:text-blue-400 transition">
            <Link to="/tv">▶️ TV</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

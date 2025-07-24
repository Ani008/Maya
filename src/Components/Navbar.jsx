import { Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className="flex items-center justify-between bg-black text-white px-6 py-4 shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xl font-semibold">MAYA</span>
      </div>

      {/* Center - Nav Links */}
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <Link to="/home" className="hover:text-green-400 cursor-pointer"> Home </Link>
        <Link to="/satellitepath" className="hover:text-green-400 cursor-pointer"> Satellite Info </Link>
        <Link to="/heatmap" className="hover:text-green-400 cursor-pointer"> Heat Map </Link>
      </div>

      {/* Right - Icons */}
      <div className="w-12 h-12 overflow-hidden rounded-full">
  <img
    src="https://imgs.search.brave.com/vT25bdova5AzWrjFWVfV3tYEiHwi22vg3z3xfQU7GgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFCaU50OFBTNUwu/anBn"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>

    </nav>
  );
}

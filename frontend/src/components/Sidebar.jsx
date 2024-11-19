import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isOpen && <span className="text-xl font-bold">SCAPA POS</span>}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? "<<" : ">>"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Dashboard" : "D"}
          </Link>
          <Link
            to="/products"
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Product" : "P"}
          </Link>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Inventory" : "I"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Reports" : "R"}
          </a>
          <a
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 transition ${
              !isOpen ? "text-center" : ""
            }`}
          >
            {isOpen ? "Settings" : "S"}
          </a>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;

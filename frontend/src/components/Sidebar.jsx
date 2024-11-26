import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [userInfo, setUserInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-speedometer2"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 4z" />
          <path d="M3.404 3.404a.5.5 0 0 1 .707 0l.707.707a.5.5 0 0 1-.707.707l-.707-.707a.5.5 0 0 1 0-.707z" />
          <path d="M2.5 8a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 2.5 8z" />
          <path d="M3.404 12.596a.5.5 0 0 1 0-.707l.707-.707a.5.5 0 0 1 .707.707l-.707.707a.5.5 0 0 1-.707 0z" />
          <path d="M13.5 8a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 1-.5-.5z" />
          <path d="M9.5 8a.5.5 0 0 1-.5.5v.5a.5.5 0 0 1-1 0v-.5a.5.5 0 0 1-.5-.5h-.5a.5.5 0 0 1 0-1h.5a.5.5 0 0 1 .5-.5v-.5a.5.5 0 0 1 1 0v.5a.5.5 0 0 1 .5.5h.5a.5.5 0 0 1 0 1h-.5z" />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      label: "Products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-box"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 1h3a1 1 0 0 1 .95.684L11.613 3h2.493a1 1 0 0 1 .862.496l.964 1.928A1 1 0 0 1 15.613 6H13v7.8a1 1 0 0 1-.606.936l-3.187 1.62a1 1 0 0 1-.814 0L5.206 14.736A1 1 0 0 1 4.6 13.8V6H2.387a1 1 0 0 1-.862-.496L.561 3.576a1 1 0 0 1-.056-.496L1.457 1H6.5z" />
        </svg>
      ),
      path: "/products",
    },
    {
      label: "Membership (Maintance)",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-person-check"
          viewBox="0 0 16 16"
        >
          <path d="M11.5 8a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z" />
          <path d="M5.5 10a3.5 3.5 0 0 0-3.5 3.5v1A3.5 3.5 0 0 0 5.5 18h5a3.5 3.5 0 0 0 3.5-3.5v-1A3.5 3.5 0 0 0 10.5 10h-5z" />
          <path d="M9 11.5V13h3.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9v1.5h5.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9v3.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V14H3.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H8V9H3.5a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5H8V3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V6h3.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9v3h5.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H9v3z" />
        </svg>
      ),
      path: "/membership",
    },
    {
      label: "Payment",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-credit-card"
          viewBox="0 0 16 16"
        >
          <path d="M2 3h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        </svg>
      ),
      path: "/payment",
    },
    {
      label: "Laporan Keuangan (Maintance)", // Financial Report
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-bar-chart"
          viewBox="0 0 16 16"
        >
          <path d="M0 0h1v16H0V0zm2 0h1v16H2V0zm2 0h1v16H4V0zm2 0h1v16H6V0zm2 0h1v16H8V0zm2 0h1v16H10V0zm2 0h1v16H12V0zm2 0h1v16H14V0z" />
        </svg>
      ),
      path: "/laporan-keuangan", // Path to the financial report page
    },
  ];

  return (
    <div className="flex h-screen">
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
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center py-2 px-4 rounded hover:bg-gray-700 transition ${
                !isOpen ? "justify-center" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span className="ml-4">{item.label}</span>}
            </Link>
          ))}
        </nav>
        {/* User Info */}
        {userInfo && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={
                  userInfo.avatar ||
                  `http://dummyimage.com/400x500/000/fff&text=${userInfo.name}`
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              {isOpen && (
                <p className="text-sm">Logged in as {userInfo.role}</p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Sidebar;

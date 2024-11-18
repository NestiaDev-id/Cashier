import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar fixed w-full transition-all py-4">
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo">
            <h1 className="text2-xl font-bold">Scapa POS</h1>
          </div>
          {/* <ul className="flex lg:gap-12 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black md:p-0 md:m-0 md:transition-none gap-8 fixed left-0 top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-lg shadow-slate-300 bg-sky-400 font-bold text-white transition-all">
            <li>
              <a href="" className="font-medium opacity-75">
                Beranda
              </a>
            </li>
            <li>
              <a href="" className="font-medium opacity-75">
                About
              </a>
            </li>
            <li>
              <a href="" className="font-medium opacity-75">
                Layanan
              </a>
            </li>
            <li>
              <a href="" className="font-medium opacity-75">
                Proyek
              </a>
            </li>
          </ul> */}
          <div className="social">
            <Link
              to="/login"
              className="bg-sky-400 px-5 py-2 rounded-full text-white font-bold hover:bg-sky-500 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

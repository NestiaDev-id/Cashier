// import { useState } from "react";
import Navbar from "../components/Navbar";
// import { TypeAnimation } from "react-type-animation";

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <header className="bg-white shadow">
//         <nav className="container mx-auto flex items-center justify-between py-4 px-6">
//           {/* Brand */}
//           <a href="#" className="text-2xl font-bold text-blue-600">
//             Scapa POS
//           </a>

//           {/* Menu Links */}
//           <div className="hidden md:flex space-x-6">
//             <a href="#" className="text-gray-700 hover:text-blue-600">
//               Home
//             </a>
//             <a href="#" className="text-gray-700 hover:text-blue-600">
//               About
//             </a>
//             <a href="#" className="text-gray-700 hover:text-blue-600">
//               Services
//             </a>
//             <a href="#" className="text-gray-700 hover:text-blue-600">
//               Contact
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-500 focus:outline-none"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </nav>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white shadow-md">
//             <a
//               href="#"
//               className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//             >
//               Home
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//             >
//               About
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//             >
//               Services
//             </a>
//             <a
//               href="#"
//               className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//             >
//               Contact
//             </a>
//           </div>
//         )}
//       </header>

//       {/* Hero Section */}
//       <section className="bg-blue-600 text-white h-screen">
//         <div className="container mx-auto flex flex-col items-start justify-start py-20 text-left">
//           <TypeAnimation
//             sequence={[
//               // Same substring at the start will only be typed out once, initially
//               "We produce food for Mice",
//               1000, // wait 1s before replacing "Mice" with "Hamsters"
//               "We produce food for Hamsters",
//               1000,
//               "We produce food for Guinea Pigs",
//               1000,
//               "We produce food for Chinchillas",
//               1000,
//             ]}
//             wrapper="span"
//             speed={50}
//             style={{ fontSize: "2em", display: "inline-block" }}
//             repeat={Infinity}
//           />
//           <p className="mt-4 max-w-xl text-lg md:text-xl">
//             We provide the best services to help your business grow and succeed.
//           </p>
//           <div className="mt-6 flex space-x-4">
//             <a
//               href="#"
//               className="rounded-lg bg-white px-6 py-3 text-blue-600 font-semibold hover:bg-gray-100"
//             >
//               Get Started
//             </a>
//             <a
//               href="#"
//               className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-blue-600"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";
import HeroImage from "../assets/images/hero.svg";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="homepage pb-10">
        <div className="container mx-auto">
          <div className="hero grid  md:grid-cols-2 grid-cols-1 items-center gap-20 pt-32">
            <div className="box">
              <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
                Scapa POS
                <span className="block mt-4 text-sky-400 font-bold text-lg underline">
                  <TypeAnimation
                    sequence={[
                      "Mempermudah pengelolaan toko Anda",
                      1000,
                      "Efisien untuk bisnis",
                      1000,
                      "Menyediakan laporan penjualan instan",
                      1000,
                      "Mendukung pembayaran digital",
                      1000,
                      "Solusi kasir terbaik untuk bisnis Anda",
                      1000,
                    ]}
                    wrapper="span"
                    speed={25}
                    style={{ fontSize: "1.25em", display: "inline-block" }}
                    repeat={Infinity}
                  />
                </span>
              </h1>
              <p className="text-base/8 mb-7">
                {" "}
                SCAPA POS adalah aplikasi kasir yang dirancang untuk memberikan
                kemudahan dalam mengelola transaksi bisnis Anda. Aplikasi ini
                dapat juga memberikan laporan penjualan instan yang membantu
                bisnis anda dengan lebih cepat.
              </p>
              <a
                href=""
                className="bg-sky-400 hover:bg-sky-500 transition-all py-1 px-4 text-white rounded-full shadow"
              >
                Tentang Kami
              </a>
            </div>
            <div className="box">
              <img
                src={HeroImage}
                alt="Hero Illustration"
                className="md:max-w-full w-[400px] md:m-0 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

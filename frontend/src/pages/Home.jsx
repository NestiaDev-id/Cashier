import { useState } from "react";
import Navbar from "../components/Navbar";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Brand */}
          <a href="#" className="text-2xl font-bold text-blue-600">
            Scapa POS
          </a>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto flex flex-col items-start justify-start py-20 text-left">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "We produce food for Mice",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "We produce food for Hamsters",
              1000,
              "We produce food for Guinea Pigs",
              1000,
              "We produce food for Chinchillas",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />
          <p className="mt-4 max-w-xl text-lg md:text-xl">
            We provide the best services to help your business grow and succeed.
          </p>
          <div className="mt-6 flex space-x-4">
            <a
              href="#"
              className="rounded-lg bg-white px-6 py-3 text-blue-600 font-semibold hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#"
              className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-blue-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

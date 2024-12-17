import Navbar from "../components/Navbar";
import HeroImage from "../assets/images/hero.svg";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="homepage pb-10">
        <div className="container mx-auto p-3">
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
      {/* <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
        <header className="h-24 sm:h-32 flex items-center z-30 w-full">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
              Watch.ME
            </div>
            <div className="flex items-center">
              <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                <a href="#" className="py-2 px-6 flex">
                  Home
                </a>
                <a href="#" className="py-2 px-6 flex">
                  Watch
                </a>
                <a href="#" className="py-2 px-6 flex">
                  Product
                </a>
                <a href="#" className="py-2 px-6 flex">
                  Contact
                </a>
                <a href="#" className="py-2 px-6 flex">
                  Carrer
                </a>
              </nav>
              <button className="lg:hidden flex flex-col ml-4">
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              </button>
            </div>
          </div>
        </header>
        <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                Be on
                <span className="text-5xl sm:text-7xl">Time</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
              <img
                src="https://www.tailwind-kit.com/images/object/10.png"
                className="max-w-xs md:max-w-sm m-auto"
              />
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
}

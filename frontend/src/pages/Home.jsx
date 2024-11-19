import Navbar from "../components/Navbar";
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

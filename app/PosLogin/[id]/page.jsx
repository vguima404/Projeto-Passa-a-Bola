"use client";
import Link from "next/link";
import HeaderPosLogin from "../../components/HeaderPosLogin";
import Sobre from "../../components/Sobre";
import Campeonato from "../../components/Campeonato";
import Footer from "../../components/Footer";


export default function Home() {
  return (
    <div className="font-['Barlow_Condensed',sans-serif] overflow-x-hidden bg-[#f7f7fa]">
      {/* HERO */}
      <section
        className="w-screen h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(7, 6, 29, 0.63) 0%, rgba(7, 7, 43, 0.7) 35%, rgba(1, 9, 20, 0.7) 100%), url('/ale&luana.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <HeaderPosLogin />
        <a
          href="#campeonato"
          onClick={e => {e.preventDefault(); document.getElementById('campeonato')?.scrollIntoView({behavior: 'smooth'});}}
            className="text-white py-3 px-6 sm:py-4 sm:px-5 md:py-5 md:px-10 rounded-xl text-base sm:text-lg md:text-xl font-bold bg-purple-500 absolute left-1/2 -translate-x-1/2 bottom-24 shadow-lg hover:bg-purple-600 transition-all duration-500 whitespace-nowrap"
        >
          Acompanhe o campeonato!
        </a>
      </section>

      {/* Sobre */}
        <Sobre />

      {/* COPA PASSA BOLA */}
      <Campeonato />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

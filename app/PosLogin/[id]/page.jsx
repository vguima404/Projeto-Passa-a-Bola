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
          backgroundImage: "url('/ale&luana.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <HeaderPosLogin />
        <a
          href="#campeonato"
          onClick={e => {e.preventDefault(); document.getElementById('campeonato')?.scrollIntoView({behavior: 'smooth'});}}
          className="text-white py-5 px-20 rounded-xl text-lg font-bold bg-purple-400 absolute left-1/2 -translate-x-1/2 bottom-24 shadow-lg hover:bg-purple-500 transition-all duration-500"
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

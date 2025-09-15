"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import BackHomeButton from "../../components/VoltarHome";
import Footer from "../../components/Footer";

export default function LojaComCarrinho() {
  const params = useParams();
  const lojaId = params?.id || "1";
  const [produtos] = useState([
    {
      id: 1,
      nome: "Camisa Oficial Passa a Bola",
      descricao: "Camisa em dry-fit, leve e confortável.",
      preco: 129.9,
      imagem: "/camisetaPassaBola.png",
    },
    {
      id: 2,
      nome: "Boné Passa a Bola",
      descricao: "Boné ajustável, ideal para dias de jogo.",
      preco: 79.9,
      imagem: "/bone.png",
    },
    {
      id: 3,
      nome: "Garrafa Térmica",
      descricao: "Mantém sua bebida gelada por até 12h.",
      preco: 99.9,
      imagem: "/garrafa.png",
    },
  ]);

  const [carrinho, setCarrinho] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("carrinhoPassaBola");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("carrinhoPassaBola");
    if (saved) {
      setCarrinho(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinhoPassaBola", JSON.stringify(carrinho));
  }, [carrinho]);

  const handleAddCarrinho = useCallback((produto) => {
    setCarrinho((prev) => {
      const idx = prev.findIndex((p) => p.id === produto.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...produto, quantity: 1 }];
    });
    setCarrinhoAberto(true);
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleDecrease = useCallback((id) => {
    setCarrinho((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  }, []);

  const handleIncrease = useCallback((id) => {
    setCarrinho((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  }, []);

  const total = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.preco * item.quantity, 0),
    [carrinho]
  );

  const totalItems = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.quantity, 0),
    [carrinho]
  );

  function formatBRL(n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <>
    <div
      className="min-h-screen py-12 px-6 relative"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(19, 17, 59, 0.63) 0%, rgba(7, 7, 43, 0.7) 35%, rgba(1, 9, 20, 0.7) 100%), url('/estadio.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto">
        

        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">🛍️ Loja Passa a Bola</h1>
          <div className="flex items-center gap-4">
            <BackHomeButton/>
            <button
              type="button"
              onClick={() => setCarrinhoAberto(true)}
              aria-label="Abrir carrinho"
              className="relative bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition"
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <p className="text-xl text-white/90 mb-10 text-center">
          Ao comprar nossos produtos, você não só leva qualidade e estilo,
          como também apoia o projeto <span className="font-bold text-purple-400">Passa a Bola</span>,
          ajudando a transformar vidas através do esporte.  
          Juntos, podemos fazer a diferença dentro e fora das quadras. ⚽💜
        </p>

        {/* Grid de produtos */}
        <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-gray-200 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition overflow-hidden flex flex-col"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800">{produto.nome}</h2>
                <p className="text-gray-600 text-sm mt-2 flex-grow">{produto.descricao}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-purple-600">{formatBRL(produto.preco)}</p>
                  <button
                    type="button"
                    onClick={() => handleAddCarrinho(produto)}
                    className="ml-4 inline-flex items-center gap-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                  >
                    <FaShoppingCart /> Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer do carrinho */}
      <aside
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform z-50 ${
          carrinhoAberto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">Meu Carrinho</h2>
          <button
            type="button"
            onClick={() => setCarrinhoAberto(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[70%]">
          {carrinho.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Carrinho vazio 🛒</p>
          ) : (
            carrinho.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-3">
                <img src={item.imagem} alt={item.nome} className="w-14 h-14 rounded object-cover" />
                <div className="flex-1 px-3">
                  <h3 className="font-semibold text-gray-800">{item.nome}</h3>
                  <p className="text-purple-600 font-bold">{formatBRL(item.preco)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDecrease(item.id)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleIncrease(item.id)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subtotal</div>
                  <div className="font-bold">{formatBRL(item.preco * item.quantity)}</div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between font-bold text-gray-800 mb-3">
            <span>Total:</span>
            <span>{formatBRL(total)}</span>
          </div>
          <Link legacyBehavior href={carrinho.length === 0 ? "#" : `/Loja/${lojaId}/CheckoutPage`} asChild>
            <a
              className={`w-full block text-center py-3 rounded-lg font-semibold transition ${
                carrinho.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
              tabIndex={carrinho.length === 0 ? -1 : 0}
              aria-disabled={carrinho.length === 0}
              onClick={e => {
                if (carrinho.length === 0) {
                  e.preventDefault();
                } else {
                  localStorage.removeItem("carrinhoPassaBola"); // Limpa o carrinho
                  setCarrinho([]); // Limpa o estado do carrinho
                }
              }}
            >
              Finalizar Compra
            </a>
          </Link>
        </div>
      </aside>
    </div>
    <Footer />
    </>
  );
}

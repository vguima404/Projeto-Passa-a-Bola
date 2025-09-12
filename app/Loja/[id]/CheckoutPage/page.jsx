"use client";
import React, { useState } from "react";
import { FaCreditCard, FaBarcode, FaQrcode, FaCheck } from "react-icons/fa";
import BackHomeButton from "../../../components/VoltarHome";

export default function CheckoutPage() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [pagamento, setPagamento] = useState("pix");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para sua API ou backend
    alert(`Compra confirmada!\nNome: ${nome}\nCPF: ${cpf}\nPagamento: ${pagamento}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Finalizar Compra 🛒
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nome do Pagador
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              CPF
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              maxLength={14}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="000.000.000-00"
            />
          </div>

          {/* Método de Pagamento */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Método de Pagamento
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPagamento("pix")}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition ${
                  pagamento === "pix"
                    ? "border-purple-600 bg-purple-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaQrcode size={24} />
                <span className="mt-2 font-medium">Pix</span>
                {pagamento === "pix" && <FaCheck className="text-purple-600 mt-1" />}
              </button>

              <button
                type="button"
                onClick={() => setPagamento("cartao")}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition ${
                  pagamento === "cartao"
                    ? "border-purple-600 bg-purple-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaCreditCard size={24} />
                <span className="mt-2 font-medium">Cartão</span>
                {pagamento === "cartao" && <FaCheck className="text-purple-600 mt-1" />}
              </button>

              <button
                type="button"
                onClick={() => setPagamento("boleto")}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition ${
                  pagamento === "boleto"
                    ? "border-purple-600 bg-purple-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaBarcode size={24} />
                <span className="mt-2 font-medium">Boleto</span>
                {pagamento === "boleto" && <FaCheck className="text-purple-600 mt-1" />}
              </button>
            </div>
          </div>

          {/* Botão de confirmação */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Confirmar Compra
          </button>
        </form>
      </div>
    </div>
  );
}

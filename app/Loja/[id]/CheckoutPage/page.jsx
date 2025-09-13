"use client";

import React, { useState } from "react";
import { FaCreditCard, FaBarcode, FaQrcode, FaCheck } from "react-icons/fa";
import { TextInput, CepInput } from "../../../components/InputComponents";


export default function CheckoutPage() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [pagamento, setPagamento] = useState("pix");

  // Campos de endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");

  const buscarEndereco = async () => {
    const cepLimpo = cep.replace(/\D/g, ""); // remove caracteres não numéricos
    if (cepLimpo.length !== 8) {
      alert("CEP inválido!");
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }
      setEndereco(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setEstado(data.uf);
    } catch (error) {
      alert("Erro ao buscar endereço.");
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Compra confirmada!
    Nome: ${nome}
    CPF: ${cpf}
    Pagamento: ${pagamento}
      Endereço: ${endereco}, ${numero}, ${bairro}, ${cidade} - ${estado}`);
    };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Finalizar Compra 🛒
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <TextInput
            label="Nome do Pagador"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            placeholder="Digite seu nome completo"
          />

          {/* CPF */}
          <TextInput
            label="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            required
            maxLength={14}
            placeholder="000.000.000-00"
          />

          {/* CEP */}
          <CepInput
            value={cep}
            onChange={e => setCep(e.target.value)}
            onBuscar={buscarEndereco}
            required
          />

          {/* Endereço */}
          {endereco && (
            <>
              <TextInput
                label="Endereço"
                value={endereco}
                readOnly
              />
              <TextInput
                label="Número"
                value={numero}
                onChange={e => setNumero(e.target.value)}
                required
                placeholder="Número da casa"
              />
              <TextInput
                label="Bairro"
                value={bairro}
                readOnly
              />
              <TextInput
                label="Cidade"
                value={cidade}
                readOnly
              />
              <TextInput
                label="Estado"
                value={estado}
                readOnly
              />
            </>
          )}

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
                {pagamento === "pix" && (
                  <FaCheck className="text-purple-600 mt-1" />
                )}
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
                {pagamento === "cartao" && (
                  <FaCheck className="text-purple-600 mt-1" />
                )}
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
                {pagamento === "boleto" && (
                  <FaCheck className="text-purple-600 mt-1" />
                )}
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

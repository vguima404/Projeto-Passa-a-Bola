"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://projeto-passa-a-bola.onrender.com";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.user?.admin === true) {
        router.push("/Admin/AdminPosLogin");
      } else {
        setError("Acesso negado. Apenas administradores podem entrar.");
      }
    } catch {
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Admin Login
        </h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

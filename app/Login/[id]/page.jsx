"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CampoTexto from "../../components/CampoTexto";
import SideImage from "../../components/SideImage";
import Button from "../../components/Button";
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://projeto-passa-a-bola.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const aoLogar = async (evento) => {
  evento.preventDefault();
  setErro("");
  setSucesso(false);

  if (!email || !senha) {
    setErro("Preencha todos os campos.");
    return;
  }

  try {
    setLoading(true);
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("user_id", data.user_id);
      setSucesso(true);
      setTimeout(() => {
        router.push("/PosLogin/1");
      }, 2000);
    } else {
      setErro(data.message);
    }
  } catch (err) {
    setErro("Erro ao conectar com o servidor.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex xl:justify-normal md:justify-normal justify-center items-center h-screen">
      <SideImage imageUrl="/taca.jpg" alt="Login" />
      <form className="bg-white w-1/2 h-screen p-2.5 shadow-[var(--shadow-8)] flex flex-col justify-center items-center" onSubmit={aoLogar}>
        <div className="w-full max-w-[370px] mx-auto flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight uppercase" style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px'}}>BEM-VINDO DE VOLTA</h2>
          <span className="text-gray-500 mb-4 text-base">Faça login na sua conta</span>
          <CampoTexto
            placeholder="Email"
            obrigatorio={true}
            valor={email}
            aoAlterado={setEmail}
            type="email"
            disabled={loading || sucesso}
          />
          <CampoTexto
            placeholder="Senha"
            obrigatorio={true}
            valor={senha}
            aoAlterado={setSenha}
            type="password"
            disabled={loading || sucesso}
          />
          {erro && (
            <span className="text-red-600 text-xs font-medium">{erro}</span>
          )}
          {sucesso && (
            <span className="text-green-600 text-xs font-medium">Login realizado com sucesso!</span>
          )}
          <Button type="submit" disabled={loading || sucesso}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-purple-200 border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                <span>Entrando…</span>
              </span>
            ) : (
              "ENTRAR"
            )}
          </Button>
          <Link href="/Cadastro/1" className="text-purple-700 text-xs font-semibold mt-2 hover:text-purple-800 hover:underline transition-all text-center block">Cadastre-se agora!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CampoTexto from "../../components/CampoTexto";
import SideImage from "../../components/SideImage";
import Button from "../../components/Button";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
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
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();

    if (data.success) {
      setSucesso(true);
      setTimeout(() => {
        router.push("/PosLogin/1");
      }, 2000);
    } else {
      setErro(data.message);
    }
  } catch (err) {
    setErro("Erro ao conectar com o servidor.");
  }
};



  return (
    <div className="flex items-center h-screen">
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
          />
          <CampoTexto
            placeholder="Senha"
            obrigatorio={true}
            valor={senha}
            aoAlterado={setSenha}
            type="password"
          />
          {erro && (
            <span className="text-red-600 text-xs font-medium">{erro}</span>
          )}
          {sucesso && (
            <span className="text-green-600 text-xs font-medium">Login realizado com sucesso!</span>
          )}
          <Button type="submit" disabled={sucesso}>ENTRAR</Button>
          <Link href="/Cadastro/1" className="text-purple-700 text-xs font-semibold mt-2 hover:text-purple-800 hover:underline transition-all text-center block">Cadastre-se agora!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
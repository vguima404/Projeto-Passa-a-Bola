"use client";
import { useState } from "react";
import CampoTexto from "../../components/CampoTexto";
import SideImage from "../../components/SideImage";
import Button from "../../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const aoLogar = (evento) => {
    evento.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    alert("Login realizado com sucesso!");
  };

  return (
    <div className="flex items-center h-screen">
      <SideImage imageUrl="/ale&luana.jpg" alt="Login" />
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
          <Button type="submit">ENTRAR</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
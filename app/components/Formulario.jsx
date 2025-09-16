  "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CampoTexto from "./CampoTexto";
import SideImage from "./SideImage";
import Button from "./Button";
import Checkbox from "./Checkbox";




const Formulario = () => {

  const [erroSenha, setErroSenha] = useState("");
  const [erroTermos, setErroTermos] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const router = useRouter();

  const aoSalvar = async (evento) => {
    evento.preventDefault();
    setErroSenha("");
    setErroTermos("");
    if (!aceitouTermos) {
      setErroTermos("Você precisa aceitar os Termos para continuar.");
      return;
    }
    if (senha !== confirmaSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        name: nome,
        password: senha
      })
    });

    if (response.ok) {
      setSucesso(true);
      setTimeout(() => {
        router.push(`/Login/1`);
      }, 500);
    } else {
      const data = await response.json();
      setErroSenha(data.error || "Erro ao cadastrar.");
    }
  } catch (error) {
    setErroSenha("Erro de conexão com o servidor.");
  }
  }

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  

  return (
    <div className="flex items-center h-screen">
      <SideImage imageUrl="/taca.jpg" alt="Teste"/>
      <form className="bg-white w-1/2 h-screen p-2.5 shadow-[var(--shadow-8)] flex flex-col justify-center items-center" onSubmit={aoSalvar}>
        <div className="w-full max-w-[370px] mx-auto flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight uppercase" style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px'}}>JUNTE-SE À COMUNIDADE<br/>PASSA A BOLA</h2>
          <span className="text-gray-500 mb-4 text-base">Crie sua conta</span>
          <CampoTexto
            placeholder="Nome Completo"
            obrigatorio={true}
            valor={nome}
            aoAlterado={setNome}
          />
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
          <CampoTexto
            placeholder="Confirmar Senha"
            obrigatorio={true}
            valor={confirmaSenha}
            aoAlterado={setConfirmaSenha}
            type="password"
          />
          {erroSenha && (
            <span className="text-red-600 text-xs font-medium">{erroSenha}</span>
          )}
          {sucesso && (
            <span className="text-green-600 text-xs font-medium">Usuário cadastrado com sucesso!</span>
          )}
          {erroTermos && (
            <span className="text-red-600 text-xs font-medium">{erroTermos}</span>
          )}
          <Checkbox label="Li e concordo com os Termos!" checked={aceitouTermos} onChange={e => setAceitouTermos(e.target.checked)} />
          <Button type="submit" disabled={sucesso}>CADASTRAR-SE</Button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
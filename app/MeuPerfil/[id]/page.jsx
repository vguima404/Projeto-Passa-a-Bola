"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMedal, FaCamera } from "react-icons/fa";
import BackHomeButton from "../../../app/components/VoltarHome";

export default function Profile() {
    const [role, setRole] = useState("comum"); // comum | jogadora | olheiro
    const [avatar, setAvatar] = useState("/images/default-avatar.png");
    const [name, setName] = useState(""); // estado para armazenar o nome do usuário
    const fileInputRef = useRef(null);
    const router = useRouter();

    const userId = localStorage.getItem("user_id");

    // Busca os dados do usuário ao montar o componente
    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:5000/user/${userId}`);
                const data = await res.json();
                if (data.success) {
                    setName(data.name || "Meu Perfil");
                    setRole(data.cpf ? "jogadora" : "comum"); // define role inicial
                    if (data.photoUrl) setAvatar(data.photoUrl);
                }
            } catch (err) {
                console.error("Erro ao buscar usuário:", err);
            }
        };

        fetchUser();
    }, [userId]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatar(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleEvoluirPerfil = async (newRole) => {
        if (!userId) {
            alert("Usuário não logado.");
            return;
        }

        try {
            const res = await fetch(`http://127.0.0.1:5000/user/${userId}/role`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole })
            });

            const data = await res.json();

            if (data.success) {
                setRole(newRole);
                if (newRole === "jogadora") router.push(`/PerfilJogadora/${userId}`);
                if (newRole === "olheiro") router.push(`/PerfilOlheiro/${userId}`);
            } else {
                alert("Erro ao evoluir perfil: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <section className="bg-gray-100 py-12 px-6 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                {/* Header */}
                <div className="flex items-center border-b pb-6 relative justify-between">
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="Perfil"
                            className="w-20 h-20 rounded-full border-4 border-purple-600 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition"
                            title="Alterar foto"
                        >
                            <FaCamera />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>
                    <div className="ml-6 justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {name || "Meu Perfil"}
                        </h2>
                        <p className="text-gray-500">
                            {role === "comum" && "Usuário comum"}
                        </p>
                    </div>
                    <BackHomeButton/>
                </div>

                {/* PERFIL COMUM */}
                {role === "comum" && (
                    <div className="mt-8 space-y-6">
                        <h3 className="text-xl font-semibold text-purple-600">Histórico de Compras</h3>
                        <ul className="space-y-3">
                            <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
                                <span>Camisa oficial Passa a Bola</span>
                                <span className="text-gray-500">10/09/2025</span>
                            </li>
                            <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
                                <span>Boné oficial Copa Passa a Bola</span>
                                <span className="text-gray-500">02/09/2025</span>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <p className="text-gray-600 mb-3">Deseja evoluir seu perfil? Clique em uma das opções abaixo:</p>
                            <div className="flex space-x-4">
                                <button
                                    className="px-4 py-2 bg-purple-600 hover:cursor-pointer transition-colors duration-300 hover:bg-purple-700 text-white rounded-lg"
                                    onClick={() => handleEvoluirPerfil("jogadora")}
                                >
                                    Jogadora
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-600 hover:cursor-pointer transition-colors duration-300 hover:bg-gray-700 text-white rounded-lg"
                                    onClick={() => handleEvoluirPerfil("olheiro")}
                                >
                                    Olheiro
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

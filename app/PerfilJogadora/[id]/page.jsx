"use client";

import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileAchievements from "../../components/profile/ProfileAchievements";
import ProfileMatchHistory from "../../components/profile/ProfileMatchHistory";
import ProfileTeam from "../../components/profile/ProfileTeam";
import ProfilePurchaseHistory from "../../components/profile/ProfilePurchaseHistory";
import PlayerRegistrationForm from "../../components/profile/PlayerRegistrationForm";
import BackHomeButton from "../../components/VoltarHome"; 

/* =========================
   Helpers
   ========================= */
function maskCPF(rawCpf) {
  const cpf = (rawCpf || "").replace(/\D/g, "").slice(0, 11);
  if (!cpf) return "";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (m, a, b, c, d) =>
    d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`
  );
}

/* =========================
   Initial dummy profile
   ========================= */
const initialProfile = {
  name: "Meu Perfil",
  email: "usuario@exemplo.com",
  photoUrl: null,
  cpf: "",
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  position: "",
  achievements: ["Artilheira"],
  matches: [],
  team: null,
};

/* =========================
   PlayerProfilePage
   ========================= */
export default function PlayerProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  /* =========================
     Busca dados do usuário logado
     ========================= */
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    fetch(`http://127.0.0.1:5000/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile({
            ...data,
            id: userId,
          });
        } else {
          console.error("Erro ao buscar usuário:", data.message);
        }
      })
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, []);

  /* =========================
     Salvar alterações (incluindo CPF)
     ========================= */
  async function handleSave(updated) {
    setProfile((prev) => ({ ...prev, ...updated }));
    setEditing(false);

    if (!profile.id) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/user/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated), // envia CPF, foto, posição etc
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Erro ao salvar perfil:", data.message);
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-purple-600">Perfil da Jogadora</h1>
          <BackHomeButton id={profile.id} />
        </div>

        {editing ? (
          <PlayerRegistrationForm
            initial={profile}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <ProfileHeader profile={profile} onEdit={() => setEditing(true)} />
              <div className="w-full md:w-2/3 space-y-6">
                <ProfileStats profile={profile} />
                <ProfileAchievements profile={profile} />
                <ProfileMatchHistory profile={profile} />
                <ProfileTeam profile={profile} onEdit={() => setEditing(true)} />
                <ProfilePurchaseHistory />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   Small subcomponents
   ========================= */
function AddCustomBadge({ onAdd }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Adicionar conquista personalizada" className="w-full border rounded-lg p-2" />
      <button type="button" onClick={() => { onAdd(v); setV(""); }} className="px-3 py-1 bg-gray-200 rounded-lg">Adicionar</button>
    </div>
  );
}

function AddMatchForm({ onAdd }) {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [goalsFor, setGoalsFor] = useState("");
  const [goalsAgainst, setGoalsAgainst] = useState("");
  const [competition, setCompetition] = useState("Copa Passa a Bola");

  function submit() {
    if (!opponent || !date || goalsFor === "" || goalsAgainst === "") {
      alert("Preencha todos os campos da partida.");
      return;
    }
    onAdd({ opponent, date, goalsFor: Number(goalsFor), goalsAgainst: Number(goalsAgainst), competition });
    setOpponent(""); setDate(""); setGoalsFor(""); setGoalsAgainst("");
  }

  return (
    <div className="grid md:grid-cols-4 gap-2">
      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="border rounded-lg p-2 md:col-span-1" />
      <input value={opponent} onChange={(e) => setOpponent(e.target.value)} placeholder="Adversário" className="border rounded-lg p-2 md:col-span-1" />
      <input value={goalsFor} onChange={(e) => setGoalsFor(e.target.value)} type="number" placeholder="Gols (eu)" className="border rounded-lg p-2 md:col-span-1" />
      <input value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)} type="number" placeholder="Gols (adversário)" className="border rounded-lg p-2 md:col-span-1" />
      <input value={competition} onChange={(e) => setCompetition(e.target.value)} placeholder="Competição" className="border rounded-lg p-2 md:col-span-3" />
      <div className="md:col-span-1 flex items-center">
        <button type="button" onClick={submit} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Adicionar partida</button>
      </div>
    </div>
  );
}

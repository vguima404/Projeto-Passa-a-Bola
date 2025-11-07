"use client";

import HeaderComunidade from "../../../components/HeaderComunidade";
import LinkHighlightCard from "../../../components/LinkHighlightCard";
import Footer from "../../../components/Footer";

import { useEffect, useMemo, useState } from "react";

function isSupportedPlatform(url) {
  const u = (url || "").toLowerCase();
  return u.includes("youtube.com") || u.includes("youtu.be") || u.includes("tiktok.com") || u.includes("instagram.com");
}

const Highlights = () => {
  const [items, setItems] = useState([]); // {id, url, uploader, createdAt, uploaderUserId, createdByDeviceId}
  const [url, setUrl] = useState("");
  const [uploader, setUploader] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [myHighlightIds, setMyHighlightIds] = useState([]); // lista de ids criados neste dispositivo
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  // carregar lista do localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("highlights:links:list");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      // device id persistente
      let did = localStorage.getItem("device_id");
      if (!did) {
        did = Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem("device_id", did);
      }
      setDeviceId(did);
      // user id atual (se logado)
      const uid = localStorage.getItem("user_id");
      if (uid) {
        setCurrentUserId(uid);
        // buscar dados do usuário para preencher nome e foto automaticamente
        (async () => {
          try {
            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://projeto-passa-a-bola.onrender.com";
            const res = await fetch(`${API_BASE}/user/${uid}`);
            const ct = res.headers.get("content-type") || "";
            if (res.ok && ct.includes("application/json")) {
              const data = await res.json();
              if (data.success) {
                setCurrentUserName(data.name || "Usuário");
                if (data.photoUrl) setCurrentUserPhoto(data.photoUrl);
              }
            }
          } catch (e) {
            console.warn("Falha ao carregar dados do usuário para highlights", e);
          }
        })();
      }
      // meus highlights (ids)
      const ownedRaw = localStorage.getItem("highlights:links:myIds");
      if (ownedRaw) {
        const parsedOwned = JSON.parse(ownedRaw);
        if (Array.isArray(parsedOwned)) setMyHighlightIds(parsedOwned);
      }
    } catch {}
  }, []);

  // persistir lista
  useEffect(() => {
    try {
      localStorage.setItem("highlights:links:list", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    const link = (url || "").trim();
    const name = currentUserName || "Usuário";
    if (!link) {
      alert("Informe o link do vídeo.");
      return;
    }
    if (!isSupportedPlatform(link)) {
      alert("Apenas links do YouTube, TikTok ou Instagram são suportados.");
      return;
    }
    // garante que temos um deviceId antes de salvar
    let did = deviceId;
    if (!did) {
      try {
        did = localStorage.getItem("device_id") || Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem("device_id", did);
        setDeviceId(did);
      } catch {}
    }
    const newId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const newItem = {
      id: newId,
      url: link,
      uploader: name,
      createdAt: Date.now(),
      uploaderUserId: currentUserId || null,
      createdByDeviceId: did || null,
      photoUrl: currentUserPhoto || "",
      title: (title || "").trim(),
      description: (description || "").trim(),
    };
    setItems((prev) => [newItem, ...prev].slice(0, 200));
    // registra propriedade local
    setMyHighlightIds((prev) => {
      const next = [newId, ...prev].slice(0, 500);
      try { localStorage.setItem("highlights:links:myIds", JSON.stringify(next)); } catch {}
      return next;
    });
    setUrl("");
  // limpar campos específicos
  setTitle("");
  setDescription("");
  // não limpamos nome porque vem do usuário
  };

  function getVideoKeyFor(urlStr) {
    try {
      return encodeURIComponent(new URL(urlStr).toString());
    } catch {
      return encodeURIComponent(urlStr || "");
    }
  }

  const removeAt = (idx) => {
    setItems((prev) => {
      const next = prev.slice();
      const removed = next.splice(idx, 1)[0];
      if (removed && removed.url) {
        const k = getVideoKeyFor(removed.url);
        try {
          localStorage.removeItem(`highlight:${k}:likes`);
          localStorage.removeItem(`highlight:${k}:liked`);
          localStorage.removeItem(`highlight:${k}:views`);
          localStorage.removeItem(`highlight:${k}:comments`);
        } catch {}
      }
      // remove id da lista de meus highlights, se existir
      if (removed && removed.id) {
        setMyHighlightIds((prevIds) => {
          const filtered = prevIds.filter((x) => x !== removed.id);
          try { localStorage.setItem("highlights:links:myIds", JSON.stringify(filtered)); } catch {}
          return filtered;
        });
      }
      return next;
    });
  };

  return (
    <>
    <HeaderComunidade />
    <div
      className="min-h-screen p-0 md:p-8 flex flex-col items-center justify-start pt-24 md:pt-28"
      style={{
        backgroundImage: " linear-gradient(90deg, rgba(9, 8, 20, 0.63) 0%, rgba(9, 31, 49, 0.7) 35%, rgba(2, 11, 22, 0.767) 100%), url('/campoFutebol2.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Card de destaque */}
      <div className="w-full max-w-4xl mx-auto mt-10 mb-8 bg-white/2  0 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2 flex items-center gap-2 drop-shadow">
          <span role="img" aria-label="Câmera"></span> Highlights da Comunidade
        </h1>
        <p className="text-lg text-gray-100 text-center max-w-2xl">
          Veja os melhores momentos das nossas jogadoras! Compartilhe, inspire-se e faça parte dessa rede de talentos. Envie seu vídeo para aparecer aqui!
        </p>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mt-2 px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition-all duration-300"
        >
          Enviar meu highlight
        </button>
      </div>

      {/* Modal de envio */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowModal(false)}
          />
          {/* content */}
          <div className="relative z-10 w-[92%] max-w-xl bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Enviar highlight</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                addItem(e);
                setShowModal(false);
              }}
              className="grid gap-3"
            >
              <div>
                <label className="block text-sm text-gray-700 mb-1">Link do vídeo (YouTube, TikTok ou Instagram)</label>
                <input
                  autoFocus
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Cole aqui o link do vídeo"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Título do vídeo (opcional)</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex.: Gol da semifinal"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descrição (opcional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contexto do lance, minuto do jogo, etc."
                  rows={3}
                  className="w-full border rounded-lg p-2 resize-none"
                />
              </div>
              <div className="flex items-center gap-3 mt-2 p-3 rounded-lg bg-gray-50 border">
                <img
                  src={currentUserPhoto || "/images/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Publicando como</span>
                  <strong className="text-sm text-gray-800">{currentUserName || "Usuário"}</strong>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
                >
                  Adicionar
                </button>
              </div>
              <p className="text-xs text-gray-500">As curtidas, comentários e visualizações ficam salvos no seu navegador (localStorage).</p>
            </form>
          </div>
        </div>
      )}

      {/* Grid moderna */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0 mb-16">
        {items.map((it, i) => {
          const canRemove =
            (it.uploaderUserId && currentUserId && it.uploaderUserId === currentUserId) ||
            (it.createdByDeviceId && deviceId && it.createdByDeviceId === deviceId) ||
            (it.id && myHighlightIds.includes(it.id));
          return (
            <div key={i} className="h-full">
              <LinkHighlightCard
                url={it.url}
                uploader={it.uploader}
                avatar={it.photoUrl}
                title={it.title}
                description={it.description}
                canRemove={canRemove}
                onRemove={() => removeAt(i)}
              />
            </div>
          );
        })}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Highlights;

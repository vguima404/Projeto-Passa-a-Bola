"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaHeart, FaComment, FaEye, FaExternalLinkAlt, FaTrash } from "react-icons/fa";

function getVideoKey(url) {
  try {
    return encodeURIComponent(new URL(url).toString());
  } catch {
    return encodeURIComponent(url || "");
  }
}

function detectPlatform(url) {
  const u = (url || "").toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("instagram.com")) return "instagram";
  return "link";
}

function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }
    // handle /embed/VIDEOID or /shorts/VIDEOID
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return null;
}

function getThumb(url) {
  const platform = detectPlatform(url);
  if (platform === "youtube") {
    const id = extractYouTubeId(url);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  // generic placeholders for tiktok/instagram/others
  if (platform === "tiktok") return "/taca.jpg";
  if (platform === "instagram") return "/taca.jpg";
  return "/taca.jpg";
}

export default function LinkHighlightCard({ url, uploader, avatar = "", title = "", description = "", canRemove = false, onRemove }) {
  const [commentText, setCommentText] = useState("");
  // comentários passam a ser objetos: { text, name, avatar, at }
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(0);
  const [showIframe, setShowIframe] = useState(false); // youtube embed

  const key = useMemo(() => getVideoKey(url), [url]);
  const platform = useMemo(() => detectPlatform(url), [url]);
  const thumb = useMemo(() => getThumb(url), [url]);

  // carregar do localStorage
  useEffect(() => {
    if (!key) return;
    try {
      const lsLikes = localStorage.getItem(`highlight:${key}:likes`);
      const lsLiked = localStorage.getItem(`highlight:${key}:liked`);
      const lsViews = localStorage.getItem(`highlight:${key}:views`);
      const lsComments = localStorage.getItem(`highlight:${key}:comments`);
      if (lsLikes !== null) setLikes(Number(lsLikes) || 0);
      if (lsLiked !== null) setLiked(lsLiked === "1");
      if (lsViews !== null) setViews(Number(lsViews) || 0);
      if (lsComments) {
        const parsed = JSON.parse(lsComments);
        if (Array.isArray(parsed)) setComments(parsed.slice(-200));
      }
    } catch {}
  }, [key]);

  // persistir mudanças
  useEffect(() => {
    if (!key) return;
    try {
      localStorage.setItem(`highlight:${key}:likes`, String(likes));
      localStorage.setItem(`highlight:${key}:liked`, liked ? "1" : "0");
    } catch {}
  }, [key, likes, liked]);

  useEffect(() => {
    if (!key) return;
    try {
      localStorage.setItem(`highlight:${key}:views`, String(views));
    } catch {}
  }, [key, views]);

  useEffect(() => {
    if (!key) return;
    try {
      localStorage.setItem(`highlight:${key}:comments`, JSON.stringify(comments));
    } catch {}
  }, [key, comments]);

  const onLike = () => {
    if (liked) {
      setLikes((v) => Math.max(0, v - 1));
      setLiked(false);
    } else {
      setLikes((v) => v + 1);
      setLiked(true);
    }
  };

  const onAddComment = (e) => {
    e.preventDefault();
    const t = (commentText || "").trim();
    if (!t) return;
    // pega nome/foto do usuário atual (se existir no localStorage)
    let name = "Usuário";
    let photo = "/images/default-avatar.png";
    try {
      const uid = localStorage.getItem("user_id");
      const cachedName = localStorage.getItem("current_user_name");
      const cachedPhoto = localStorage.getItem("current_user_photo");
      if (cachedName) name = cachedName;
      if (cachedPhoto) photo = cachedPhoto;
      // como fallback, usa o uploader/avatar do card se existirem
      if (!cachedName && uploader) name = uploader;
      if (!cachedPhoto && avatar) photo = avatar;
    } catch {}

    const entry = { text: t, name, avatar: photo, at: Date.now() };
    setComments((prev) => [...prev, entry]);
    setCommentText("");
  };

  const onView = () => {
    setViews((v) => v + 1);
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {}
  };

  const onPlayYouTube = () => {
    // troca para iframe e conta uma visualização
    if (!showIframe) setViews((v) => v + 1);
    setShowIframe(true);
  };

  const platformBadge = (
    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
      {platform.toUpperCase()}
    </span>
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden relative w-full h-full flex flex-col hover:shadow-2xl transition-transform duration-300">
      {/* Botão remover (se permitido) */}
      {canRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          className="absolute top-2 right-2 z-10 bg-white/90 text-red-600 hover:bg-white px-2 py-1 rounded-md shadow flex items-center gap-1 text-sm"
          title="Remover highlight"
        >
          <FaTrash /> Remover
        </button>
      )}

      {/* Mídia */}
      {platform === "youtube" ? (
        <div className="relative w-full">
          {showIframe ? (
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={(() => {
                  const id = extractYouTubeId(url);
                  return id ? `https://www.youtube.com/embed/${id}?rel=0` : "";
                })()}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <button type="button" onClick={onPlayYouTube} className="relative w-full group">
              <div className="w-full aspect-video">
                <img src={thumb} alt="preview" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="flex items-center gap-2 text-white font-semibold bg-black/40 px-3 py-2 rounded-full">
                  Assistir
                </span>
              </div>
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={onView} className="relative w-full group">
          <div className="w-full aspect-video">
            <img src={thumb} alt="preview" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="flex items-center gap-2 text-white font-semibold bg-black/40 px-3 py-2 rounded-full">
              Abrir <FaExternalLinkAlt />
            </span>
          </div>
        </button>
      )}

      {/* Conteúdo */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={avatar || "/images/default-avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-purple-200 flex-shrink-0"
              onError={(e)=>{ e.currentTarget.src='/images/default-avatar.png'; }}
            />
            <h3 className="font-semibold text-gray-800 truncate" title={uploader}>{uploader}</h3>
          </div>
          {platformBadge}
        </div>
        {title && (
          <h4 className="text-sm font-semibold text-purple-700 mb-1 line-clamp-2" title={title}>{title}</h4>
        )}
        {description && (
          <p className="text-xs text-gray-600 mb-3 whitespace-pre-line line-clamp-4" title={description}>{description}</p>
        )}

        {/* Ações */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <button onClick={onLike} className={`flex items-center gap-2 font-medium ${liked ? "text-red-600" : "text-gray-600"}`}>
            <FaHeart /> {likes}
          </button>
          <div className="flex items-center gap-2">
            <FaComment /> {comments.length}
          </div>
          <div className="flex items-center gap-2">
            <FaEye /> {views}
          </div>
        </div>

        {/* Comentários */}
        <form onSubmit={onAddComment} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Escreva um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border rounded-full px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
            Postar
          </button>
        </form>
        <div className="max-h-28 overflow-y-auto space-y-2">
          {comments.map((c, i) => {
            const isObj = c && typeof c === 'object';
            const text = isObj ? c.text : String(c);
            const name = isObj ? (c.name || "Usuário") : "Usuário";
            const pic = isObj ? (c.avatar || "/images/default-avatar.png") : "/images/default-avatar.png";
            return (
              <div key={i} className="flex items-start gap-2 text-sm bg-gray-100 px-3 py-2 rounded-xl">
                <img src={pic} alt="avatar" className="w-6 h-6 rounded-full object-cover border" onError={(e)=>{ e.currentTarget.src='/images/default-avatar.png'; }} />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 truncate max-w-full">{name}</div>
                  <div className="text-gray-700 break-words whitespace-pre-wrap">{text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

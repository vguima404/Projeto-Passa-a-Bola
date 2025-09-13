"use client";
import React, { useState } from "react";
import { FaHeart, FaComment, FaEye, FaUserCircle } from "react-icons/fa";

const HighlightCard = ({ videoUrl, jogador }) => {
  const [likes, setLikes] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [views, setViews] = useState(Math.floor(Math.random() * 500) + 50);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (novoComentario.trim() !== "") {
      setComentarios([...comentarios, novoComentario]);
      setNovoComentario("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
      {/* Vídeo */}
      <div className="relative">
        <video
          src={videoUrl}
          controls
          className="w-full h-64 object-cover"
          onPlay={() => setViews(views + 1)}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome */}
        <h3 className="font-semibold text-lg mb-3 text-gray-800">{jogador}</h3>

        {/* Ações */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-red-500 font-medium hover:scale-110 transition-transform"
          >
            <FaHeart /> {likes}
          </button>
          <div className="flex items-center gap-2">
            <FaComment /> {comentarios.length}
          </div>
          <div className="flex items-center gap-2">
            <FaEye /> {views}
          </div>
        </div>

        {/* Comentários */}
        <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            className="border rounded-full px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Postar
          </button>
        </form>

        <div className="max-h-24 overflow-y-auto space-y-2">
          {comentarios.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <FaUserCircle className="text-gray-400 text-lg" />
              <p className="bg-gray-100 px-3 py-2 rounded-xl">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
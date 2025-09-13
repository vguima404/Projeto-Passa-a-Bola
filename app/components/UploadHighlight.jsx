"use client";
import React, { useState } from "react";
import { FaVideo, FaUpload, FaHeart, FaRegComment, FaEye } from "react-icons/fa";


// 🔹 Componente para upload do highlight
const UploadHighlight = ({ onAddHighlight }) => {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(URL.createObjectURL(file)); // preview local
    } else {
      alert("Por favor, selecione um arquivo de vídeo válido.");
    }
  };

  const handleUpload = () => {
    if (!video) {
      alert("Selecione um vídeo antes de publicar!");
      return;
    }
    onAddHighlight({
      video,
      caption,
      likes: 0,
      comments: [],
      views: Math.floor(Math.random() * 200) + 1, // simulação
    });
    setVideo(null);
    setCaption("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-10 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaVideo className="text-purple-600" /> Adicione seu Highlight
      </h2>

      {/* Upload */}
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-500 rounded-lg cursor-pointer hover:bg-purple-50 transition">
        {video ? (
          <video src={video} controls className="w-full h-36 rounded-lg object-cover" />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <FaUpload className="text-3xl mb-2" />
            <p>Clique para selecionar seu vídeo</p>
          </div>
        )}
        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
      </label>

      {/* Legenda */}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Escreva uma legenda (opcional)..."
        className="w-full border border-gray-300 rounded-lg mt-4 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Botão */}
      <button
        type="button"
        onClick={handleUpload}
        className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Publicar Highlight
      </button>
    </div>
  );
};

export default UploadHighlight;
"use client";

import { useRouter } from "next/navigation";

export default function BackHomeButton({ id }) {
  const router = useRouter();

  const handleClick = () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      router.push(`/PosLogin/${id}`);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-600 text-white font-medium shadow-md hover:bg-purple-700 hover:cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      Voltar para o home
    </button>
  );
}
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(_req, { params }) {
  const { id } = params || {};
  try {
    const file = path.join(
      process.cwd(),
      "public",
      "data",
      "player",
      String(id),
      "feedback.json"
    );
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (_) {
    const data = [
      {
        id: "f1",
        coach: "Técnico Silva",
        rating: 8,
        note: "Boa movimentação sem bola e finalização precisa.",
        date: new Date().toISOString(),
      },
      {
        id: "f2",
        coach: "Técnica Ana",
        rating: 7,
        note: "Trabalhar passe em profundidade e recomposição.",
        date: new Date(Date.now() - 9 * 86400000).toISOString(),
      },
    ];
    return NextResponse.json(data);
  }
}

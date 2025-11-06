import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(_req, { params }) {
  const { id } = params || {};
  // Tenta carregar de JSON local em public/data/player/{id}/stats.json
  try {
    const file = path.join(
      process.cwd(),
      "public",
      "data",
      "player",
      String(id),
      "stats.json"
    );
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (_) {
    // Fallback mock; substituir por backend real quando disponível
    const data = {
      playerId: id,
      matches: 24,
      goals: 12,
      assists: 7,
      position: "Atacante",
      ratingAvg: 8.1,
      wins: 15,
    };
    return NextResponse.json(data);
  }
}

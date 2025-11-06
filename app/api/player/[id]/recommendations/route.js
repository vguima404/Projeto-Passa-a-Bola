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
      "recommendations.json"
    );
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (_) {
    const data = [
      {
        id: "r1",
        team: "Associação Atlética Local",
        positions: ["Atacante", "Ponta"],
        distanceKm: 4.3,
      },
      {
        id: "r2",
        team: "Esporte Clube Bairro",
        positions: ["Meia"],
        distanceKm: 7.8,
      },
    ];
    return NextResponse.json(data);
  }
}

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
      "competitions.json"
    );
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (_) {
    const data = [
      {
        id: "c1",
        name: "Copa Passa a Bola",
        status: "inscrita",
        result: null,
        startDate: new Date().toISOString(),
      },
      {
        id: "c2",
        name: "Liga Metropolitana",
        status: "concluída",
        result: "Semifinal",
        startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
    ];
    return NextResponse.json(data);
  }
}

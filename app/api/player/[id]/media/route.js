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
      "media.json"
    );
    const raw = await fs.readFile(file, "utf-8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (_) {
    const items = [
      {
        id: "v1",
        title: "Highlights vs Time X",
        views: 1200,
        likes: 180,
        comments: 24,
        createdAt: new Date().toISOString(),
        visibility: "público",
      },
      {
        id: "v2",
        title: "Treino de finalização",
        views: 850,
        likes: 95,
        comments: 12,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        visibility: "público",
      },
    ];
    const totals = items.reduce(
      (acc, v) => {
        acc.views += v.views;
        acc.likes += v.likes;
        acc.comments += v.comments;
        return acc;
      },
      { views: 0, likes: 0, comments: 0 }
    );
    return NextResponse.json({ playerId: id, items, totals });
  }
}

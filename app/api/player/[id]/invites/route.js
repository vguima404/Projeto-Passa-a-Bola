import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { id } = params || {};
  const data = [
    {
      id: "i1",
      team: "Ferroviária Sub-20",
      status: "pendente",
      date: new Date().toISOString(),
    },
    {
      id: "i2",
      team: "Corinthians Base",
      status: "aceito",
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
  ];
  return NextResponse.json(data);
}

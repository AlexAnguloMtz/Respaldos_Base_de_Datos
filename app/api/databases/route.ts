import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    const response: Response = await fetch(`http://localhost:8080/databases/${id}`, { cache: 'no-cache' });
    return NextResponse.json(await response.json());
  }
  const response: Response = await fetch('http://localhost:8080/databases', { cache: 'no-cache' });
  return NextResponse.json(await response.json());
}
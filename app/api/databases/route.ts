import { NextResponse } from "next/server";

export async function GET() {
  const response: Response = await fetch('http://localhost:8080/databases', { cache: 'no-cache' });
  return NextResponse.json(await response.json());
}
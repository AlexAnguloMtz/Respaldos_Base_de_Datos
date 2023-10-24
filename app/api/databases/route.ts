import { NextResponse } from "next/server";

export async function GET() {
  const response: Response = await fetch('http://localhost:8080/databases');
  return NextResponse.json(await response.json());
}
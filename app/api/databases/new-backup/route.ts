import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const response: Response = await fetch(`http://${process.env.API_HOST}/databases/${id}/backups`, { method: 'POST', cache: 'no-cache' });
  return NextResponse.json(await response.json());
}
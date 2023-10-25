import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const backups = url.searchParams.get('backups');
  if (id) {
    const uri: string = `http://${process.env.API_HOST}/databases/${id}${backups ? '?backups=true' : ''}`;
    const response: Response = await fetch(uri, { cache: 'no-cache' });
    return NextResponse.json(await response.json());
  }
  const response: Response = await fetch(`http://${process.env.API_HOST}/databases`, { cache: 'no-cache' });
  return NextResponse.json(await response.json());
}


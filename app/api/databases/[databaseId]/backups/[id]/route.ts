import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { databaseId: string, id: string } }) {
  const response: Response = await fetch(`http://${process.env.API_HOST}/databases/${params.databaseId}/backups/${params.id}`, { cache: 'no-cache' });
  return new NextResponse(await response.text());
}
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const patrimonio = searchParams.get("patrimonio")

  if (!patrimonio) {
    const { rows } = await sql`SELECT * FROM equipamentos;`;
    return NextResponse.json(rows, { status: 200 });
  } else {
    const { rows } = await sql`SELECT * FROM equipamentos WHERE patrimonio = ${ patrimonio };`;
    return NextResponse.json(rows, { status: 200 });
  }
}

export async function PUT(request: Request) {
  try {
    const { statusid, patrimonio } = await request.json()

    await sql`UPDATE equipamentos SET statusid = ${statusid} WHERE patrimonio = ${patrimonio}`;
    return NextResponse.json({ status: 200 })
  } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
  }
}
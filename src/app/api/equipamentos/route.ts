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

export async function POST(request: Request) {
  try {
    const { patrimonio, item, lotacao, sala, categoria, nome, datacriacao } = await request.json()
    
    const result = await sql`SELECT id FROM situacoes WHERE situacao = 'Em uso' LIMIT 1`
    const statusId = result.rows[0].id

    await sql`INSERT INTO equipamentos (patrimonio, item, lotacao, situacao, sala, categoria, nome, datacriacao) VALUES (${patrimonio}, ${item}, ${lotacao}, ${ statusId }, ${sala}, ${categoria}, ${nome}, ${datacriacao})`;
    
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log(error)
      return NextResponse.json({ error }, { status: 500 });
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
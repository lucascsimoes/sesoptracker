import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        const { rows } = await sql`SELECT * FROM historico`;
        return NextResponse.json(rows, { status: 200 });
    } else {
        const { rows } = await sql`SELECT * FROM historico WHERE id = ${id}`;
        return NextResponse.json(rows, { status: 200 });
    }
}

export async function POST(request: Request) {
    try {
        const { patrimonio, dataalteracao, statusanterior, statusatual, usuario, descricao, observacao, importante } = await request.json()

        await sql`INSERT INTO historico (patrimonio, dataalteracao, statusanterior, statusatual, usuario, descricao, observacao, importante) VALUES (${patrimonio}, ${dataalteracao}, ${statusanterior}, ${statusatual}, ${usuario}, ${descricao}, ${observacao}, ${importante});`;

        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
      const { id, importante } = await request.json()
  
      await sql`UPDATE historico SET importante = ${importante} WHERE id = ${id}`;
      return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    try {
      await sql`DELETE FROM historico WHERE id = ${id}`;
      return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
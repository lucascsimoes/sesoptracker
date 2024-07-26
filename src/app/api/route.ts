import axios from "axios";
import { format } from "date-fns";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
    try {
        const response = await axios.get("http://localhost:3001/equipamentos")
        return NextResponse.json(response.data)
    } catch (error: any) {
        return NextResponse.json(error, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const newEquipment = {
            dataCriacao: format(new Date(), "yyyy-MM-dd"),
            ...data
        }

        return NextResponse.json(newEquipment, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(error, { status: 500 })
    }
}
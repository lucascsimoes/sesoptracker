import { IEquipment } from "@/interfaces/IEquipment";
import { IRooms } from "@/interfaces/IRooms";
import Link from "next/link";
import { ReactElement } from "react";

interface RoomCardProps {
    room: IRooms
    quantity: number
}

export default function RoomCard({ room, quantity }: RoomCardProps): ReactElement {
    return (
        <Link
            href={`/salas/${ room.sala }`}
            className="flex items-center gap-6 rounded bg-card p-5 my-3"
        >
            <p className="text-lg"> Sala { room.sala } </p>
            <p className="py-1 px-2 bg-secondary rounded-sm text-white/50 text-[12px] ml-auto"> há { quantity } equipamento{ quantity === 1 ? "" : "s" } aqui </p>
        </Link>
    )
}
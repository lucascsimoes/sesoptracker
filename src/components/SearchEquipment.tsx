import Link from "next/link";
import { ReactElement } from "react";
import { CardRevealedPointer } from "./CardRevealedPointer";
import { statusColor } from "@/services/statusColor";
import { IEquipment } from "@/interfaces/IEquipment";

export default function SearchEquipment({ list }: { list: IEquipment[] }): ReactElement {
    
    console.log(list)
    
    return (
        <main className="flex flex-col gap-4 p-10">
            { list.map(item => (
                <Link key={item.patrimonio} href={`/equipamento/${item.patrimonio}`} className="w-full h-full">
                    <CardRevealedPointer className="p-8 rounded-lg">
                        <header>
                            <p style={{ background: statusColor(item.statusid) }} className="ml-auto w-fit text-sm text-black rounded px-2 py-1"> { item.statusid } </p>
                        </header>
                        <h1 className="text-3xl font-semibold"> { item.patrimonio } </h1>
                    </CardRevealedPointer>
                </Link>
            )) }
        </main>
    )
}
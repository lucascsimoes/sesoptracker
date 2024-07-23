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
                <Link key={item.Patrimonio} href={`/equipamento/${item.Patrimonio}`} className="w-full h-full">
                    <CardRevealedPointer className="p-8 rounded-lg">
                        <header>
                            <p style={{ background: statusColor(item.StatusID) }} className="ml-auto w-fit text-sm text-black rounded px-2 py-1"> { item.StatusID } </p>
                        </header>
                        <h1 className="text-3xl font-semibold"> { item.Patrimonio } </h1>
                    </CardRevealedPointer>
                </Link>
            )) }
        </main>
    )
}
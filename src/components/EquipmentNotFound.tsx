import { CircleX } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { Button } from "./ui/button";

export default function EquipmentNotFound(): ReactElement {
    return (
        <div className="flex flex-col items-center justify-center gap-2 h-dvh">
            <CircleX size={100} className="text-stone-800"/>
            <h3 className="text-3xl text-center font-bold"> Esse equipamento não existe </h3>
            <p className="text-stone-600 max-w-[500px] text-center"> Verifique se os filtros que está utilizando estão realmente corretos ou volte para a página de equipamentos </p>

            <Button asChild className="mt-8"> 
                <Link href={"/equipamentos"} className="font-500 text-black"> Ver equipamentos </Link>
            </Button>
        </div>
    )
}
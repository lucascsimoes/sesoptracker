import Link from "next/link";
import { ReactElement } from "react";
import { CardRevealedPointer } from "./CardRevealedPointer";
import { Separator } from "./ui/separator";

import { Monitor, Printer, Armchair, Computer, HardDrive, Laptop, MicVocal, Presentation, Projector, RadioReceiver, Sofa, Phone, Network, RockingChair, Smartphone } from 'lucide-react'

interface CategoryListIconsProps {
    [category: string]: ReactElement
}

const categoryIcons: CategoryListIconsProps = {
    "informatica": <Monitor size={22} strokeWidth={1.5}/>,
    "mobilia": <Armchair size={22} strokeWidth={1.5}/>,
    "telefonia": <Phone size={22} strokeWidth={1.5}/>,
    "audiovisual": <MicVocal size={22} strokeWidth={1.5}/>
}

export default function CategoryCard({ name, path }: { name: string, path: string }): ReactElement {

    return (
        <Link className="flex w-full h-48 rounded-xl border border-border" href={`/categorias/${ path }`}>
            <CardRevealedPointer className="flex flex-col-reverse justify-center items-center px-10 w-full h-full">
                <h1 className="font-black uppercase text-3xl md:text-4xl"> { name } </h1>
                <Separator className="w-[30%] my-4"/>
                <div className="opacity-90 text-primary"> { categoryIcons[path] } </div>
            </CardRevealedPointer>
        </Link>
    )
}
"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"  

import { IoHomeOutline, IoHome, IoGridOutline, IoGrid, IoCubeOutline, IoCube, IoMapOutline, IoMap, IoFileTrayStacked, IoFileTrayStackedOutline, IoMenu } from "react-icons/io5";
import { Separator } from "./ui/separator";

const links = [
    {
        text: 'Início',
        icon: <IoHomeOutline size={21}/>,
        currentIcon: <IoHome size={21}/>,
        path: '/'
    },
    {
        text: 'Dashboard',
        icon: <IoGridOutline size={21}/>,
        currentIcon: <IoGrid size={21}/>,
        path: '/dashboard'
    },
    {
        text: 'Equipamentos',
        icon: <IoCubeOutline size={21}/>,
        currentIcon: <IoCube size={21}/>,
        path: '/equipamentos'
    },
    {
        text: 'Salas',
        icon: <IoMapOutline size={21}/>,
        currentIcon: <IoMap size={21}/>,
        path: '/salas'
    },
    {
        text: 'Categorias',
        icon: <IoFileTrayStackedOutline size={21}/>,
        currentIcon: <IoFileTrayStacked size={21}/>,
        path: '/categorias'
    }
]

export default function Navbar(): ReactElement {

    const location = usePathname()

    return (
        <nav className="flex flex-row-reverse shadow-lg shadow-background md:shadow-none md:inline items-center px-8 md:px-0 left-0 top-0 h-20 w-full md:h-dvh md:min-w-[300px] md:w-0 bg-card z-40">
            <Image 
                width={180}
                height={36}
                src={'/assets/logo.png'}
                alt="Logo"
                draggable={false}
                priority={true}
                className="rotate-180 scale-[-0.8] md:scale-100 md:rotate-0 mr-auto md:mx-auto md:my-8"
            />

            <Separator orientation="vertical" className="block md:hidden h-[50%] ml-6"/>

            <Sheet>
                <SheetTrigger className="block md:hidden">
                    <IoMenu size={26}/>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <ul className="mt-8">
                        { links.map(link => (
                            <li key={link.path} className="px-3 relative">
                                <Link className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card-foreground ${ location == link.path ? 'before:block' : 'before:hidden' } before:content-[''] before:absolute before:w-[5px] before:h-[40%] before:bg-primary before:rounded-full before:left-0`} href={link.path}>
                                    <h2 className="text-2xl"> { link.text } </h2>
                                </Link>
                            </li>
                        )) }
                    </ul>
                </SheetContent>
            </Sheet>

            <ul className="hidden md:block">
                { links.map(link => (
                    <li key={link.path} className="px-3 relative">
                        <Link className={`flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card-foreground ${ location == link.path ? 'before:block' : 'before:hidden' } before:content-[''] before:absolute before:w-[5px] before:h-[40%] before:bg-primary before:rounded-full before:left-0`} href={link.path}>
                            { location != link.path ? link.icon : link.currentIcon }
                            <p> { link.text } </p>
                        </Link>
                    </li>
                )) }
            </ul>
        </nav>
    )
}
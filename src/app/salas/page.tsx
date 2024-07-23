import { ReactElement } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { CardRevealedPointer } from "@/components/CardRevealedPointer";

export default function Salas(): ReactElement {
    return (
        <div className="xl:flex h-full">
            <aside className="relative pt-20 pb-0 px-12 xl:w-1/2 sm:px-20 xl:px-20 2xl:px-40">
                <h1 className="text-4xl sm:text-5xl font-black mb-8"> Veja todos os equipamentos de uma sala </h1>
                <p className="pl-10 border-l border-l-primary text-[#cacaca]"> Você pode filtrar suas buscas e percorrer as salas cadastradas no sistema. As salas são divididas em Administrativo, Sala de Aula e Laboratório. Entre na seção que deseja e encontre a sala </p>
            </aside>
            <section className="xl:w-1/2 px-12 py-20 sm:px-20 2xl:px-40">
                <Accordion defaultValue={['item-1', 'item-2', 'item-3']} type="multiple"  className="w-full">
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger>
                            <div className="w-[40px] h-[40px] rounded-full bg-primary border-4 border-primary-700 mr-6"></div>
                            <p className="mr-auto text-lg"> Administrativo </p>
                        </AccordionTrigger>
                        <AccordionContent className="relative">
                            <div className="absolute left-4 w-1 h-full bg-primary-700 rounded-lg"></div>
                            <main className="flex flex-wrap gap-4 pl-16 py-6">
                                { ["407", "411-B", "412-B", "412-C", "502"].map(sala => (
                                    <Link key={sala} className="w-28 h-14" href={`/salas/${sala}`}>
                                        <CardRevealedPointer className="flex items-center justify-center font-medium"> { sala } </CardRevealedPointer>
                                    </Link>
                                )) }
                            </main>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-0">
                        <AccordionTrigger>
                            <div className="w-[40px] h-[40px] rounded-full bg-primary border-4 border-primary-700 mr-6"></div>
                            <p className="mr-auto text-lg"> Salas de Aula </p>
                        </AccordionTrigger>
                        <AccordionContent className="relative">
                            <div className="absolute left-4 w-1 h-full bg-primary-700 rounded-lg"></div>
                            <main className="flex flex-wrap gap-4 pl-16 py-6">
                                { ["406", "408", "414", "501", "503", "504"].map(sala => (
                                    <Link key={sala} className="w-28 h-14" href={`/salas/${sala}`}>
                                        <CardRevealedPointer className="flex items-center justify-center font-medium"> { sala } </CardRevealedPointer>
                                    </Link>
                                )) }
                            </main>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-0">
                        <AccordionTrigger>
                            <div className="w-[40px] h-[40px] rounded-full bg-primary border-4 border-primary-700 mr-6"></div>
                            <p className="mr-auto text-lg"> Laboratórios </p>
                        </AccordionTrigger>
                        <AccordionContent className="relative">
                            <div className="absolute left-4 w-1 h-full bg-primary-700 rounded-lg"></div>
                            <main className="flex flex-wrap gap-4 pl-16 py-6">
                                { ["401", "402", "412-A"].map(sala => (
                                    <Link key={sala} className="w-28 h-14" href={`/salas/${sala}`}>
                                        <CardRevealedPointer className="flex items-center justify-center font-medium"> { sala } </CardRevealedPointer>
                                    </Link>
                                )) }
                            </main>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    )
}
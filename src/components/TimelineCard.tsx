import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ITimeline } from "@/interfaces/ITimeline"
import { statusColor } from "@/services/statusColor"
import { Ban, EllipsisVertical, Flag, MoveRight, Trash } from "lucide-react"
  

export default function TimelineCard({ timeline }: { timeline: ITimeline }) {
    return (
        <div className="relative flex items-stretch py-2 pl-8">
            <aside className="absolute left-0 top-0 h-full flex grow items-center border-l-2 border-dotted border-white">
                <div className="translate-x-[-15px] border-8 border-card bg-white w-[28px] h-[28px] rounded-full"></div>
            </aside>
            <div className="w-full grid grid-cols-3 gap-8 items-center relative bg-card rounded p-4 pl-16">
                { timeline.Importante &&
                    <div className="absolute left-4 shadow shadow-primary rounded-lg w-[5px] h-[calc(100%-24px)] bg-primary"></div>
                }
                <div>
                    <p> { timeline.Descricao } </p>
                    <p className="text-[13px] opacity-70"> { timeline.Observacao } </p>
                </div>
                <div className="flex items-center gap-2">
                    { timeline.StatusAnterior != timeline.StatusAtual &&
                        <>
                        <p style={{ background: statusColor(timeline.StatusAnterior) }} className="px-2 py-1 rounded text-[11px] text-black"> { timeline.StatusAnterior } </p>
                        <MoveRight strokeWidth={1.25}/>
                        <p style={{ background: statusColor(timeline.StatusAtual) }} className="px-2 py-1 rounded text-[11px] text-black"> { timeline.StatusAtual } </p>
                        </>
                    }
                </div>
                <aside className="ml-auto">
                    <MoreActions
                        isImportant={timeline.Importante}
                        user={timeline.Usuario}
                    />
                </aside>
            </div>
        </div>
    )
}

function MoreActions({ 
        isImportant, 
        user 
    }: { 
        isImportant: boolean, 
        user: string 
    }
) {
    "use client"



    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-1 px-2 focus-visible:outline-none">
                <EllipsisVertical size={20}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Flag size={18}/>
                    <p> { isImportant ? "Desmarcar" : "Marcar" } como importante </p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash size={18}/>
                    <p> Remover </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                    <span className="cursor-default flex items-center justify-center w-[28px] h-[28px] rounded-full bg-secondary text-[10px]"> { user[0] } </span>
                    <p> { user } </p>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
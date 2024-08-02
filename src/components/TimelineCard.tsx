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
import axios from "axios"
import { format } from "date-fns"
import { CircleX, EllipsisVertical, Flag, MoveRight, Trash } from "lucide-react"
import { useToast } from "./ui/use-toast"
import { Button } from "./ui/button"
import { iconByDescription } from "@/lists/iconByDescription"

interface ITimelineCardProps {
    timeline: ITimeline;
    last: number;
}

export default function TimelineCard({ timeline, last }: ITimelineCardProps) {

    const { toast } = useToast()

    const handleImportant = () => {
        try {
            axios.put(`http://localhost:3000/api/historico`, {
                id: timeline.id,
                importante: !timeline.importante
            })
        } catch (error) {
            toast({
                description: (
                    <div className="flex items-center gap-3">
                        <CircleX size={18} color="#d63e3e"/>
                        <p> Erro ao alterar a importância. Tente novamente mais tarde </p>
                    </div>
                )
            })
        }
    }

    const removeTimeline = () => {
        try {
            axios.delete(`http://localhost:3000/api/historico?id=${timeline.id}`)
        } catch (error) {
            toast({
                description: (
                    <div className="flex items-center gap-3">
                        <CircleX size={18} color="#d63e3e"/>
                        <p> Erro ao remover o histórico. Tente novamente mais tarde </p>
                    </div>
                )
            })
        }
    }

    const currentIcon = timeline.descricao.includes("adicionado") ? "adicionado" : timeline.descricao.includes("Status") ? "status" : "info"
    
    return (
        <div className="flex">
            <aside className="relative">
                { timeline.importante &&
                    <div className="flex justify-center items-center absolute top-[-2px] left-0 right-0 mx-auto">
                        <div className="relative inline-flex">
                            <div className="w-[36px] h-[36px] rounded-full bg-[#d23535]"></div>
                            <div className="w-[26px] h-[26px] rounded-full bg-[#d23535] absolute inset-0 m-auto animate-ping"></div>
                            <div className="w-[36px] h-[36px] rounded-full bg-[#d23535] absolute top-0 left-0 animate-pulse"></div>
                        </div>
                    </div>
                }
                <div style={{ background: statusColor(timeline.statusatual) }} className="flex items-center justify-center rounded-full relative p-1 relative z-10 border-4 border-card text-stone-950/50">
                    { iconByDescription(currentIcon) }
                </div>
                <div style={{ borderColor: statusColor(timeline.statusatual) }} className={`${ last == timeline.id && "border-dashed" } border absolute inset-0 mx-auto w-0.5 h-full`}></div>
            </aside>
            <main className="ml-2 mt-0.5 grow pb-12 mr-6">
                <p> { timeline.descricao } </p>
                <p className="text-sm opacity-50"> { format(timeline.dataalteracao, "dd 'de' MMMM, yyyy - HH:mm") } </p>
                <p className="text-[14px] italic mt-4"> { timeline.observacao } </p>
            </main>
            <div className="mt-0.5 ml-auto">
                <MoreActions
                    timeline={timeline}
                    last={last}
                    handleImportant={handleImportant}
                    removeTimeline={removeTimeline}
                />
            </div>
        </div>
    )
}



interface MoreActionsProps {
    timeline: ITimeline;
    last: number;
    handleImportant: () => void;
    removeTimeline: () => void;
}

function MoreActions({ timeline, last, handleImportant, removeTimeline }: MoreActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="py-0.5 px-2 focus-visible:outline-none">
                <Button variant={"secondary"}>
                    <EllipsisVertical size={20}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleImportant}>
                    <Flag size={18}/>
                    <p> { timeline.importante ? "Desmarcar" : "Marcar" } como importante </p>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={last == timeline.id} onClick={removeTimeline}>
                    <Trash size={18}/>
                    <p> Remover </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                    <span className="cursor-default flex items-center justify-center w-[28px] h-[28px] rounded-full bg-secondary text-[10px]"> { timeline.usuario[0] } </span>
                    <p> { timeline.usuario } </p>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
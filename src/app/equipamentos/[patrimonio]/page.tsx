"use client"

import { ReactElement } from "react";

import { EquipmentService } from "@/services/equipments";
import { IEquipment } from "@/interfaces/IEquipment";
import { ITimeline } from "@/interfaces/ITimeline";
import { statusColor } from "@/services/statusColor";

import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale"

import { Ellipsis, MoveRight } from 'lucide-react';
import TimelineCard from "@/components/TimelineCard";

export default function Equipment({ params }: { params: { patrimonio: string } }): ReactElement {

    setDefaultOptions({ locale: ptBR })
    const { data, isLoading, error } = EquipmentService.get(params.patrimonio)

    if (isLoading) return <p> Carregando... </p>
    if (error) return <p> Houve um erro </p>

    let equipment: IEquipment | null = null;
    let timeline: ITimeline[] | null = null;
    
    if (!Array.isArray(data)) { 
        equipment = data.equipment; 
        timeline = data.timeline
    }
    if (!equipment || !timeline) { return <p> Não foi encontrado nenhum equipamento com o patrimônio {params.patrimonio} </p>; }

    return (
        <div className="flex items-center justify-center h-dvh">
            <div className="w-[1300px] max-w-full mx-auto">
                <h1 className="text-5xl font-bold"> { equipment.Patrimonio } </h1>

                <div className="mt-4">
                        { timeline.map(item => (
                            <TimelineCard 
                                key={`${ item.Descricao }-${item.Observacao}`} 
                                timeline={item}
                            />
                        )) }
                    </div>
            </div>
        </div>
    )
}
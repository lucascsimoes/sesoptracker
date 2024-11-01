"use client"

import { ReactElement, useState } from "react";

import useSWR from "swr";
import { ArrowUpDown } from "lucide-react";

import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select"
import RoomCard from "@/components/RoomCard";
import { IEquipment } from "@/interfaces/IEquipment";
import { IRooms } from "@/interfaces/IRooms";
import fetcher from "@/services/fetcher";
import orderRooms from "@/services/orderRooms";

interface IRoomEquipment {
    salas: IRooms[]
    equipamentos: IEquipment[]
}
  

export default function Salas(): ReactElement {

    const { data, isLoading, error } = useSWR(["http://localhost:3000/api/salas", "http://localhost:3000/api/equipamentos"], fetcher)
    const [selectValue, setSelectValue] = useState<string>("categoria")

    if (isLoading) return <p> Carregando... </p>
    if (error) return <p> Houve um erro. Tente novamente mais tarde </p>

    return (
        <div className="p-6 pb-16 sm:p-16">
            <header className="bg-card rounded px-4 py-2 mb-16">
            <Select defaultValue={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger className="w-[180px]">
                    <ArrowUpDown size={18}/>
                    <p> Organizar por </p>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ordem crescente">Ordem crescente</SelectItem>
                    <SelectItem value="ordem decrescente">Ordem decrescente</SelectItem>
                    <SelectItem value="categoria">Categoria</SelectItem>
                    <SelectItem value="andar">Andar</SelectItem>
                </SelectContent>
            </Select>
            </header>

            { selectValue === "ordem crescente" && <OrderBy data={data} type="asc" /> }
            { selectValue === "ordem decrescente" && <OrderBy data={data} type="desc" /> }
            { selectValue === "categoria" && <OrderByCategory data={data} /> }
            { selectValue === "andar" && <OrderedByFloor data={data} /> }
        </div>
    )
}

function OrderedByFloor({ data }: { data: IRoomEquipment } ): ReactElement {

    const { salas, equipamentos } = data
    const floors = ["4º andar", "5º andar"]
    const group4 = salas.filter(item => item.sala.startsWith('4'))
    const group5 = salas.filter(item => item.sala.startsWith('5'))
    orderRooms(salas, "asc")

    return (
        <>
        { floors.map((floor: string) => (
            <div key={floor} className="mb-12">
                <header className="flex items-center gap-4 my-8">
                    <h3 className="font-bold text-lg"> { floor } </h3>
                    <p className="w-5 h-5 flex items-center justify-center bg-secondary text-white/50 rounded-sm text-[12px]"> { floor.startsWith('4') ? group4.length : group5.length } </p>
                </header>

                { floor.startsWith('4') && group4.sort().map(item => <RoomCard key={item.sala} room={item} quantity={equipamentos.filter(equipment => equipment.salaid === item.sala).length} /> ) }
                { floor.startsWith('5') && group5.sort().map(item => <RoomCard key={item.sala} room={item} quantity={equipamentos.filter(equipment => equipment.salaid === item.sala).length} /> ) }
            </div>
        )) }
        </>
    )
}

function OrderBy({ data, type }: { data: IRoomEquipment, type: string } ): ReactElement {

    const { salas, equipamentos } = data
    orderRooms(salas, type)

    return (
        <>
        { salas.map(item => <RoomCard key={item.sala} room={item} quantity={equipamentos.filter(equipment => equipment.salaid === item.sala).length} /> )}
        </>
    )
}

function OrderByCategory({ data }: { data: IRoomEquipment } ): ReactElement {

    const { salas, equipamentos } = data
    const categories = Array.from(new Set(salas.map(item => item.descricao)))
    orderRooms(salas, "asc")
    
    return (
        <>
            { categories.sort().map((category: string) => (
                <div key={category} className="mb-12">
                    <header className="flex items-center gap-4 mb-8">
                        <h3 className="font-bold text-lg"> { category } </h3>
                        <p className="w-5 h-5 flex items-center justify-center bg-secondary text-white/50 rounded-sm text-[12px]"> { salas.filter(item => item.descricao === category ).length } </p>
                    </header>

                    { salas.filter(item => item.descricao === category).sort().map(room => <RoomCard key={room.sala} room={room} quantity={equipamentos.filter(item => item.salaid === room.sala).length} /> ) }
                </div>
            )) }
        </>
    )
}
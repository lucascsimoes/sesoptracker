'use client'

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"

import { statusColor } from "@/services/statusColor";

import { IFilter } from "@/interfaces/IFilter";
import { IEquipment } from "@/interfaces/IEquipment";
import { Plus, Search, Filter } from 'lucide-react'
import useSWR from "swr";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input";
import { MagicExit, MagicMotion, MagicTabSelect } from "react-magic-motion";
import fetcher from "@/services/fetcher";
import { showStatus } from "@/lists/status";

  

const links = [
    { value: "", label: 'Todos' },
    { value: 'informatica', label: 'Informática' },
    { value: 'mobilia', label: 'Mobília' },
    { value: 'telefonia', label: 'Telefonia' },
    { value: 'audiovisual', label: 'Audiovisual' },
]

const showByList = [
    { value: 'patrimonio', label: 'Patrimônio' },
    { value: 'item', label: 'Item' },
]

function filterStatus(data: IEquipment[], status: string) {
    if (status != "todos") {
        return data.filter(item => item.StatusID.toLowerCase() == status)
    }

    return data
}

function filterTransferidos(data: IEquipment[], show: boolean) {
    if (!show) {
        return data.filter(item => item.StatusID != "Transferido")
    }

    return data
}

function filterDevolvidos(data: IEquipment[], show: boolean) {
    if (!show) {
        return data.filter(item => item.StatusID != "Devolvido")
    }

    return data
}

function filterEmprestados(data: IEquipment[], show: boolean) {
    if (!show) {
        return data.filter(item => item.StatusID != "Emprestado")
    }

    return data
}

export default function Equipamentos() {

    const { data, error, isLoading } = useSWR([`http://localhost:3001/equipamentos`], fetcher)
    const [filteredData, setFilteredData] = useState<IEquipment[]>([])

    const [hash, setHash] = useState<string>("")
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const [showBy, setShowBy] = useState<string>("patrimonio")
    const [search, setSearch] = useState<string>("")
    const [filters, setFilters] = useState<IFilter>({
        status: "todos",
        showTransferido: true,
        showDevolvido: true,
        showEmprestado: true
    })

    useEffect(() => {
        if (data !== undefined) {
            const newData = data.map((item: any) => ({
                ...item,
                Item: item.Item == null ? "-" : item.Item
            }))

            setFilteredData(newData)
        }
    }, [data])

    useEffect(() => {
        if (data !== undefined) {
            handleDataFilter(filters)
        }
    }, [filters])

    const changeFilters = {
        showBy: (status: string) => {
            setShowBy(status)
        },
        status: (type: string) => {
            setFilters(oldFilters => ({
                ...oldFilters,
                status: type
            }))
        },
        switchTransferido: (checked: boolean) => {
            setFilters(oldFilters => ({
                ...oldFilters,
                showTransferido: checked
            }))
        },
        switchDevolvido: (checked: boolean) => {
            setFilters(oldFilters => ({
                ...oldFilters,
                showDevolvido: checked
            }))
        },
        switchEmprestado: (checked: boolean) => {
            setFilters(oldFilters => ({
                ...oldFilters,
                showEmprestado: checked
            }))
        }
    }

    async function handleDataFilter(filters: IFilter) {
        const copy = [...data]
        let filtered: IEquipment[]

        filtered = filterStatus(copy, filters.status)
        filtered = filterTransferidos(filtered, filters.showTransferido)
        filtered = filterDevolvidos(filtered, filters.showDevolvido)
        filtered = filterEmprestados(filtered, filters.showEmprestado)
        setFilteredData(filtered)
    }

    if (isLoading || data === undefined) return <p> Carregando... </p>
    if (error) return <p> Houve um erro </p>

    return (
        <div className="flex min-h-dvh">
            <aside className="hidden lg:block fixed left-[300px] w-[320px] h-dvh p-10">
                <Link href={'/add/equipamento'}>
                    <Button className="flex items-center text-black w-full gap-2 font-normal">
                        <Plus size={20} strokeWidth={1.5}/>
                        <p> Novo equipamento </p>
                    </Button>
                </Link>
                <div className="flex flex-col items-center bg-card rounded-lg w-full p-4 py-6 my-8">
                    <h4 className="w-full text-left text-[14px] font-semibold mb-2 mt-4"> Mostrar </h4>
                    <Combobox 
                        items={showByList} 
                        onSelect={value => changeFilters.showBy(value)}
                        value={showBy}
                        className="min-w-full"
                    />

                    <h4 className="w-full text-left text-[14px] font-semibold mb-2 mt-4"> Mostrar status </h4>
                    <Combobox 
                        items={showStatus} 
                        onSelect={value => changeFilters.status(value)}
                        value={filters.status}
                        className="min-w-full"
                    />   
                    
                    <div className="w-full flex items-center gap-3 flex-wrap my-2 mt-6">
                        <Switch 
                            defaultChecked={true}
                            checked={filters.showTransferido}
                            disabled={filters.status !== "todos"}
                            onCheckedChange={checked => changeFilters.switchTransferido(checked)}
                        />
                        <h4 className="text-left text-[14px]"> Mostrar transferidos </h4>
                    </div>

                    <div className="w-full flex items-center gap-3 flex-wrap my-2">
                        <Switch 
                            defaultChecked={true}
                            checked={filters.showDevolvido}
                            disabled={filters.status !== "todos"}
                            onCheckedChange={checked => changeFilters.switchDevolvido(checked)}
                        />
                        <h4 className="text-left text-[14px]"> Mostrar devolvidos </h4>
                    </div>

                    <div className="w-full flex items-center gap-3 flex-wrap my-2">
                        <Switch 
                            defaultChecked={true}
                            checked={filters.showEmprestado}
                            disabled={filters.status !== "todos"}
                            onCheckedChange={checked => changeFilters.switchEmprestado(checked)}
                        />
                        <h4 className="text-left text-[14px]"> Mostrar emprestados </h4>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <h4 className="font-bold text-sm mb-4"> Visualizar </h4>
                    { links.map(link => (
                        <Link key={link.value} onClick={() => setHash(link.value)} className="h-[32px] relative group flex items-center justify-between" href={`#${ link.value == undefined ? '' : link.value }`}> 
                            { hash == link.value && (
                                <div className="top-[-3px] h-full w-[2px] absolute translate-y-[3px]">
                                    <MagicTabSelect
                                        id="underline"
                                        transition={{ type: "spring", bounce: 0 }}
                                    >
                                        <div className="h-full w-full bg-primary absolute"/>
                                    </MagicTabSelect>
                                </div>
                            ) }
                            <p className={`group-hover:opacity-100 transition ml-5 mr-auto ${ hash == link.value ? "opach-fullity-100" : "opacity-50" }`}> { link.label } </p>
                            <span className={`group-hover:opacity-100 text-[11px] font-medium transition ${ hash == link.value ? "opacity-100" : "opacity-50" }`}> { link.label != "Todos" && filteredData.filter(equipmnent => equipmnent.CategoriaID == link.label).length } </span>
                        </Link>
                    )) }
                </div>
            </aside>
            <main className="w-full pb-20 px-6 sm:px-10 ml-0 lg:ml-[320px] relative pt-[100px] md:pt-[120px]">
                <div className="fixed flex items-center gap-2 w-[calc(100%-48px)] sm:w-[calc(100%-80px)] md:w-[calc(100%-380px)] lg:w-[calc(100%-700px)] shadow-2xl shadow-background top-[80px] md:top-0 pt-[30px] lg:pt-[40px] bg-background">
                    <div className="flex items-center w-full relative">
                        <Search size={22} className="absolute left-5 opacity-60"/>
                        <Input 
                            className="h-[52px] pl-14"
                            placeholder={`Pesquisar ${ filteredData.length } equipamentos`}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Dialog 
                        open={dialogOpen}
                        onOpenChange={open => setDialogOpen(open)}
                    >
                        <DialogTrigger className="block lg:hidden flex items-center justify-center bg-secondary min-w-[52px] w-0 h-[52px] rounded">
                            <Filter size={19}/>
                        </DialogTrigger>
                        <DialogContent aria-describedby={undefined} className="sm:w-full">
                            <DialogTitle className="w-full block">
                                <h2 className="font-semibold text-lg"> Filtros </h2>
                            </DialogTitle>
                            
                            <main>
                                <div className="w-full">
                                    <h4 className="w-full text-left text-[14px] font-semibold mb-2 mt-4"> Mostrar </h4>
                                    <Combobox 
                                        items={showByList} 
                                        onSelect={value => changeFilters.showBy(value)}
                                        value={showBy}
                                        className="min-w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <h4 className="w-full text-left text-[14px] font-semibold mb-2 mt-4"> Mostrar status </h4>
                                    <Combobox 
                                        items={showStatus} 
                                        onSelect={value => changeFilters.status(value)}
                                        value={filters.status}
                                        className="min-w-full"
                                    />                
                                </div>  

                                <div className="w-full flex items-center gap-3 flex-wrap my-4 mt-6">
                                    <Switch 
                                        defaultChecked={true}
                                        checked={filters.showTransferido}
                                        disabled={filters.status !== "todos"}
                                        onCheckedChange={checked => changeFilters.switchTransferido(checked)}
                                    />
                                    <h4 className="text-left text-[14px]"> Mostrar transferidos </h4>
                                </div>

                                <div className="w-full flex items-center gap-3 flex-wrap my-4">
                                    <Switch 
                                        defaultChecked={true}
                                        checked={filters.showDevolvido}
                                        disabled={filters.status !== "todos"}
                                        onCheckedChange={checked => changeFilters.switchDevolvido(checked)}
                                    />
                                    <h4 className="text-left text-[14px]"> Mostrar devolvidos </h4>
                                </div>

                                <div className="w-full flex items-center gap-3 flex-wrap my-4">
                                    <Switch 
                                        defaultChecked={true}
                                        checked={filters.showEmprestado}
                                        disabled={filters.status !== "todos"}
                                        onCheckedChange={checked => changeFilters.switchEmprestado(checked)}
                                    />
                                    <h4 className="text-left text-[14px]"> Mostrar emprestados </h4>
                                </div>     
                            </main>
                        </DialogContent>
                    </Dialog>
                    <Link className="block lg:hidden" href={'/add/equipamento'}>
                        <Button className="flex items-center text-black w-full h-[52px] gap-2 font-normal">
                            <Plus size={20} strokeWidth={1.5}/>
                        </Button>
                    </Link>
                </div>
                <MagicMotion>
                    <section>
                    { hash != "" ?
                        links.slice(1).map(link => (
                            <div key={link.value} id={link.value} className="flex justify-center lg:justify-start flex-wrap gap-4 my-3 mb-12 scroll-mt-[120px]">
                                <h2 className="block w-full text-lg font-[500]"> { link.label } </h2>
                                { filteredData
                                    .filter(item => {
                                        const key = showBy == "patrimonio" ? "Patrimonio" : "Item"
                                        return item[key]?.toString().includes(search)
                                    })
                                    .filter(item => item.CategoriaID == link.label)
                                    .map(equipment => (
                                        <Link key={equipment.Patrimonio} className="max-w-full w-[250px] bg-card p-4" href={`/equipamentos/${ equipment.Patrimonio }`}>
                                            <header className="flex items-center gap-2 mb-2 px-2">
                                                <div style={{ background: statusColor(equipment.StatusID) }} className="w-[7px] h-[7px] rounded-full"></div>
                                                <p className="text-[13px]"> { equipment.StatusID } </p>
                                            </header>
                                            <div className="flex items-center gap-2 text-[11px] text-[#ffffff70]">
                                                <p className="bg-secondary w-full p-1 rounded"> { equipment.NomeID } </p>
                                                <p className="bg-secondary p-1 rounded"> { equipment.SalaID } </p>
                                            </div>
                                            <h2 className="bg-secondary rounded p-2 mt-2 font-bold text-2xl text-center w-full"> { showBy == "patrimonio" ? equipment.Patrimonio : equipment.Item }  </h2>
                                        </Link>
                                    )) }
                            </div>
                        ))
                        :
                        <div className="flex justify-center lg:justify-start flex-wrap gap-4 my-3 ">
                            { filteredData
                                .filter(item => {
                                    const key = showBy == "patrimonio" ? "Patrimonio" : "Item"
                                    return item[key]?.toString().includes(search)
                                })
                                .map(equipment => (
                                    <Link key={equipment.Patrimonio} className="max-w-full w-[250px]" href={`/equipamentos/${ equipment.Patrimonio }`}>
                                        <div className="w-full h-full bg-card p-4 rounded">
                                            <header className="flex items-center gap-2 mb-2 px-2">
                                                <div style={{ background: statusColor(equipment.StatusID) }} className="w-[7px] h-[7px] rounded-full"></div>
                                                <p className="text-[13px]"> { equipment.StatusID } </p>
                                            </header>
                                            <div className="flex items-center gap-2 text-[11px] text-[#ffffff70]">
                                                <p className="bg-secondary w-full p-1 rounded"> { equipment.NomeID } </p>
                                                <p className="bg-secondary p-1 rounded"> { equipment.SalaID } </p>
                                            </div>
                                            <h2 className="bg-secondary rounded p-2 mt-2 font-bold text-2xl text-center w-full"> { showBy == "patrimonio" ? equipment.Patrimonio : equipment.Item }  </h2>
                                        </div>
                                    </Link>
                                )) }
                        </div>
                    }
                    </section>
                </MagicMotion>
            </main>
        </div>
    )
}
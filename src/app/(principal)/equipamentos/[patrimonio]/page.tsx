"use client"

import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,  DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import TimelineCard from "@/components/TimelineCard";

import { ArrowLeft, Ellipsis, History, Info, MoveRight, Pencil, BarChart, FileOutput, AlertCircle, CircleCheckBig, CircleX, Route, FileX2 } from 'lucide-react';
import { MagicTabSelect } from "react-magic-motion";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
  
import { IEquipment } from "@/interfaces/IEquipment";
import { ITimeline } from "@/interfaces/ITimeline";
import { statusColor } from "@/services/statusColor";
import axios from "axios";
import useSWR, { mutate } from "swr";
import fetcher from "@/services/fetcher";
import { showStatus } from "@/lists/status";
import EquipmentNotFound from "@/components/EquipmentNotFound";



const tabList: { text: string, icon: ReactElement }[] = [
    {
        text: "Informações",
        icon: <Info size={17}/>
    },
    {
        text: "Histórico",
        icon: <History size={17}/>
    },
    {
        text: "Estatísticas",
        icon: <BarChart size={17}/>
    }
]

const SignupSchema = Yup.object().shape({
    observacao: Yup.string()
      .min(2, 'A observação deve ter no mínimo 2 caracteres')
      .max(250, 'A observação deve ter no máximo 250 caracteres'),
    usuario: Yup.string()
        .min(2, 'O usuário deve conter no mínimo 2 caracteres')
        .max(20, 'O usuário deve conter no máximo 20 caracteres')
        .required("Informe o nome de quem está alterando")
});



export default function Equipment({ params }: { params: { patrimonio: string } }): ReactElement {

    const { data, error, isLoading } = useSWR([`http://localhost:3000/api/historico?patrimonio=${params.patrimonio}`, `http://localhost:3000/api/equipamentos?patrimonio=${params.patrimonio}`], fetcher)
    
    const [currentTab, setCurrentTab] = useState<number>(0)
    const handleCurrentTab = (index: number) => setCurrentTab(index)
    setDefaultOptions({ locale: ptBR })
    
    if (isLoading || data === undefined) return <p> Carregando... </p>
    if (data.equipamentos === undefined) return <EquipmentNotFound/>
    if (error) return <p> Houve um erro </p>

    const equipamento = data.equipamentos[0]

    return (
        <main className="flex flex-col p-4 sm:p-12 min-h-dvh h-full">
            <header className="flex items-center gap-12 mb-12">
                <Button 
                    asChild
                    variant={"secondary"}
                    className="group w-[35px] h-[35px] p-0"
                >
                    <Link href={"/equipamentos"}>
                        <ArrowLeft size={18} className="group-hover:opacity-100 opacity-50 transition-all"/>
                    </Link>
                </Button>
                <h2 className="text-lg font-[500]"> Equipamento { equipamento.patrimonio } </h2>
            </header>

            <div className="flex gap-4 xl:h-[48px] flex-wrap xl:flex-nowrap">
                <div className="w-full border rounded px-3 sm:px-6">
                    <Tabs handleTab={handleCurrentTab}/>
                </div>
                <div className="flex items-center h-[48px] bg-card-foreground rounded px-4 gap-4 ml-auto">
                    <p className="whitespace-nowrap text-sm"> Adicionado em </p>
                    <p className="p-2 rounded bg-background text-sm"> { format(equipamento.datacriacao, "dd/MM/yyyy")  } </p>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/edit/${ equipamento.patrimonio }`}>
                                <Button variant={"ghost"} className="w-[48px] h-[48px] p-0">
                                    <Pencil size={18}/>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p> Editar </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <section className="rounded w-full h-full py-16 px-8 lg:p-16 bg-card mt-8">
                { currentTab === 0 && <InfosTab { ...equipamento } /> }
                { currentTab === 1 && <TimelineTab { ...data.historico } /> }
            </section>
        </main>
    )
}

function InfosTab(equipment: IEquipment) {

    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false)
    const [status, setStatus] = useState<string | null>("")

    const handleSubmit = async (values: { observacao: string, usuario: string }) => {
        if (status == "" || status == null) {
            setStatus(null)
            return
        }

        try {
            axios.put("http://localhost:3000/api/equipamentos", {
                estado: showStatus.find(item => item.value == status)?.label,
                patrimonio: equipment.patrimonio
            })

            axios.post("http://localhost:3000/api/historico", {
                patrimonio: equipment.patrimonio,
                dataalteracao: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                statusanterior: equipment.estado,
                statusatual: showStatus.find(item => item.value == status)?.label,
                usuario: values.usuario,
                descricao: "Status alterado para " + showStatus.find(item => item.value == status)?.label,
                observacao: values.observacao || null,
                importante: false
            })

            mutate("http://localhost:3000/api/equipamentos")
            mutate("http://localhost:3000/api/historico")
        } catch (e: any) {
            toast({
                description: (
                    <div className="flex items-center gap-3">
                        <CircleX size={18} color="#d63e3e"/>
                        <p> Erro ao alterar o status. Tente novamente mais tarde </p>
                    </div>
                )
            })
            return;
        } finally {
            setOpen(false)
        }

        toast({
            description: (
                <div className="flex items-center gap-3">
                    <CircleCheckBig size={18} color="#73d63e"/>
                    <p> Status alterado com sucesso </p>
                </div>
            )
        })
    }

    return (
        <>
            <header className="flex items-center gap-4 mb-8 flex-wrap sm:flex-nowrap">
                <p className="rounded py-3 px-6 text-black/40 w-full sm:grow whitespace-nowrap" style={{ background: statusColor(equipment.estado) }}> { equipment.estado } </p>
                <Dialog open={open} onOpenChange={open => setOpen(open)}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-fit h-[48px]" variant={"ghost"}> Alterar status </Button>
                    </DialogTrigger>
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{ observacao: '', usuario: '' }}
                        onSubmit={values => handleSubmit(values)}
                    >
                    {({ errors, touched }) => (
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="mb-4">
                                <DialogTitle> Editar status </DialogTitle>
                                <DialogDescription> Ao confirmar a mudança de status, será adicionada ao histórico do componente </DialogDescription>
                            </DialogHeader>

                            { status == null ? 
                                <div className="flex items-center gap-3 bg-secondary p-3">
                                    <AlertCircle size={18} color="#cd3d3d"/>
                                    <p className="text-[14px]"> Informe o status de mudança </p>
                                </div> 
                                :
                                (errors.observacao && touched.observacao) ? 
                                <div className="flex items-center gap-3 bg-secondary p-3">
                                    <AlertCircle size={18} color="#cd3d3d"/>
                                    <p className="text-[14px]"> { errors.observacao } </p>
                                </div> 
                                :
                                (errors.usuario && touched.usuario) && 
                                <div className="flex items-center gap-3 bg-secondary p-3">
                                    <AlertCircle size={18} color="#cd3d3d"/>
                                    <p className="text-[14px]"> { errors.usuario } </p>
                                </div> 
                            }

                            <Form>
                                <main className="flex items-end gap-2">
                                    <div className="w-fit">
                                        <p className="text-sm mb-1"> De </p>
                                        <p style={{ background: statusColor(equipment.estado) }} className="flex items-center px-4 rounded h-[40px] text-center text-black/50 text-sm"> { equipment.estado } </p>
                                    </div>
                                    <MoveRight className="h-[40px]" strokeWidth={1.25}/>
                                    <div className="grow">
                                        <p className="text-sm mb-1"> Para </p>
                                        <Select onValueChange={(value) => setStatus(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                { showStatus
                                                    .slice(1)
                                                    .filter(item => item.value !== equipment.estado.toLowerCase())
                                                    .map(item => (
                                                        <SelectItem key={item.value} value={item.value}> { item.element } </SelectItem>
                                                )) }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </main>
                                <Field 
                                    as={Input} 
                                    name="observacao" 
                                    className="mt-4" 
                                    placeholder="Observação"
                                />
                                <Field 
                                    as={Input} 
                                    name="usuario" 
                                    className="mt-4 mb-6" 
                                    placeholder="Usuário"
                                />
                                <DialogFooter>
                                    <Button variant={"secondary"} type="submit"> Salvar mudanças </Button>
                                </DialogFooter>
                            </Form>
                        </DialogContent>
                    )}
                    </Formik>
                </Dialog>
            </header>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 *:grow *:bg-background *:p-8 *:rounded">
                <div>
                    <p className="opacity-60"> Patrimônio </p>
                    <h1 className="text-5xl font-bold"> { equipment.patrimonio } </h1>
                </div>
                <div>
                    <p className="opacity-60"> Item </p>
                    <h1 className="text-5xl font-bold"> { equipment.item ?? "-" } </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-8 *:grow *:bg-background *:p-4 *:rounded">
                <div>
                    <p className="opacity-60 text-sm"> Categoria </p>
                    <h1 className="text-2xl font-bold"> { equipment.categoria } </h1>
                </div>
                <div>
                    <p className="opacity-60 text-sm"> Nome </p>
                    <h1 className="text-2xl font-bold"> { equipment.nome } </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 *:grow *:bg-background *:p-4 *:rounded">
                <div>
                    <p className="opacity-60 text-sm"> Lotação </p>
                    <h1 className="text-2xl font-bold"> { equipment.lotacao ?? "-" } </h1>
                </div>
                <div>
                    <p className="opacity-60 text-sm"> Sala </p>
                    <h1 className="text-2xl font-bold"> { equipment.sala } </h1>
                </div>
            </div>
        </>
    )
}

function TimelineTab(timeline: ITimeline[]) {
    const orderArray = Object.values(timeline).sort((a, b) => {
        const dateA = new Date(a.dataalteracao).getTime()
        const dateB = new Date(b.dataalteracao).getTime()
        return dateB - dateA
    })

    return (
        <div className="flex items-center justify-center">
            { timeline.length === 0 ? 
                <p className="text-lg opacity-50 text-center"> Não há histórico para este equipamento </p>
                :
                <div className="w-full">
                    { orderArray.reverse().map(item => (
                        <TimelineCard 
                            key={item.id} 
                            last={orderArray[orderArray.length - 1].id}
                            timeline={item}
                        />
                    )) }
                    <p className="text-sm py-2 px-4 rounded bg-secondary text-center text-stone-400"> Hoje, { format(new Date(), "dd/MM/yyyy") } </p>
                </div>
            }
        </div>
        
    )
}

function Tabs({ handleTab }: { handleTab: (index: number) => void }) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    useEffect(() => {
        handleTab(selectedIndex)
    }, [selectedIndex])
 
    const tabsComponents = tabList.map((item, i) => {
        return (
        <button
            key={`tab-${item.text}`}
            onClick={() => setSelectedIndex(i)}
            disabled={item.text == "Estatísticas" || item.text == "Relatório"}
            className="w-fit text-[15px] disabled:opacity-50 h-[48px]"
        >
            <div className="flex items-center gap-2">
                { item.icon }
                <p > {item.text} </p>
            </div>
    
            {selectedIndex === i && (
            <div className="relative translate-y-[11px]">
                <MagicTabSelect id="underline" transition={{ type: "spring", bounce: 0 }}>
                    <div className="w-full absolute bg-primary h-[2px]"/>
                </MagicTabSelect>
            </div>
            )}
        </button>
        );
    });
    
    return <div className="flex justify-between sm:justify-around gap-6 sm:gap-4 w-[calc(100dvw-56px)] sm:w-auto overflow-auto"> {tabsComponents} </div>
}

"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"

import * as Yup from "yup"
import axios from "axios"
import { format } from "date-fns"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Check, ChevronLeft, ChevronRight, Circle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeedbackException from "@/components/FeedbackException"
import Loading from "@/components/Loading"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IEquipment } from "@/interfaces/IEquipment"
import { ITimeline } from "@/interfaces/ITimeline"
import { IRooms } from "@/interfaces/IRooms"
import orderRooms from "@/services/orderRooms"



const EquipmentSchema = Yup.object().shape({
    sala: Yup.string()
        .min(2, "A sala deve conter pelo menos 2 caracteres")
        .max(30, "A sala deve ser menor que 30 caracteres")
        .required("A sala é obrigatória"),
    categoria: Yup.string()
        .required("A categoria é obrigatória"),
    item: Yup.number()
        .typeError("O item deve ser um número"),
    nome: Yup.string()
        .min(2, "O nome do equipamento deve conter pelo menos 2 caracteres")
        .max(30, "O nome do equipamento deve ser menor que 30 caracteres")
        .required("O nome do equipamento é obrigatório"),
    lotacao: Yup.string()
        .min(2, "A lotação do equipamento deve conter pelo menos 2 caracteres")
        .max(40, "A lotação do equipamento deve ser menor que 40 caracteres")
})



const initialValues = {
    item: '',
    lotacao: '',
    sala: '',
    categoria: '',
    nome: ''
}

const CompleteForm = ({ patrimonio, salas, handleForm }: { patrimonio: string, salas: IRooms[], handleForm: (current: number) => void }) => {
    
    const router = useRouter()
    const [validateOnChangeUser, setValidateOnChangeUser] = useState<boolean>(false)
    const [validateOnChangeComplete, setValidateOnChangeComplete] = useState<boolean>(false)

    const [open, setOpen] = useState<boolean>(false)
    const [confirmData, setConfirmData] = useState<{ equipamento: IEquipment, historico: Omit<ITimeline, 'id' | 'usuario'> } | undefined>(undefined)
    const handleSubmit = (values: Omit<IEquipment, 'patrimonio' | 'situacao' | 'datacriacao'>) => {
        setOpen(true)

        const newEquipmentData = {
            ...values,
            patrimonio,
            situacao: "Em uso",
            item: values.item === "" ? null : values.item,
            lotacao: values.lotacao === "" ? null : values.lotacao,
            datacriacao: format(new Date(), "yyyy-MM-dd HH:mm:ss")
        }

        const newTimelineData = {
            patrimonio,
            dataalteracao: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            situacaoanterior: "Em uso",
            situacaoatual: "Em uso",
            descricao: "Equipamento adicionado ao sistema",
            observacao: null,
            importante: false
        }

        setConfirmData({
            equipamento: newEquipmentData,
            historico: newTimelineData,
        })
    }

    const handleConfirmSubmit = (values: { usuario: string }) => {
        try {
            axios.post("http://localhost:3000/api/equipamentos", confirmData?.equipamento)
            // axios.post("http://localhost:3000/api/historico", {
            //     ...confirmData?.historico,
            //     usuario: values.usuario
            // })

            // router.push("/equipamentos")
        } catch (e) {
            setOpen(false)
            toast({
                variant: "destructive",
                description: "Houve um erro ao adicionar o equipamento. Tente novamente mais tarde"
            })
        }
    }

    const categories = Array.from(new Set(salas.map((item: IRooms) => item.descricao)))

    return (
        <main className="flex flex-col w-full min-h-dvh py-12 px-8 sm:p-20">
            <div className="absolute -z-[1] top-0 left-0 w-[calc(100dvw/2)] h-[calc(100dvh/2)] bg-[#545454] bg-[radial-gradient(at_left_top,_#545454,_#000000,_#000000)]"/>
            <header className="max-w-full w-[900px] mb-12">
                <p className="text-primary text-sm sm:text-lg tracking-[8px] mb-3"> CRIAR EQUIPAMENTO </p>
                <h1 className="text-4xl sm:text-6xl font-bold"> Adicionar equipamento ao sistema </h1>
            </header>
            <section className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16">
                <Formik
                    validationSchema={EquipmentSchema}
                    initialValues={initialValues}
                    validateOnBlur={false}
                    validateOnChange={validateOnChangeComplete}
                    onSubmit={handleSubmit}
                >
                    {({ errors, setFieldValue, values }) => (
                        <div className="w-full grow relative">
                            <Form action={"/equipamentos"} className="lg:flex justify-between gap-16 mt-4 *:grow form-with-label">
                                <div className="w-full space-y-6">
                                    <div className="rounded p-4 flex items-center gap-4 bg-card mb-8">
                                        <Button onClick={() => handleForm(0)} variant={"ghost"} className="p-2">
                                            <ChevronLeft size={18}/>
                                        </Button>
                                        <span className="opacity-50 text-[16px] italic"> Patrimônio: </span>
                                        <p className="text-[20px]"> { patrimonio } </p>
                                    </div>
                                    <fieldset>
                                        <label> Número de Item </label>
                                        <Field 
                                            as={Input}
                                            name="item"
                                            placeholder="Informe o número de item" 
                                            className={`${ errors.item && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] placeholder:text-[15px] px-6` }
                                        />
                                        <ErrorMessage component={FeedbackException} name="item"/>
                                    </fieldset>
                                    <div className="flex xl:flex-row flex-col gap-6 xl:*:w-1/2 *:w-full">
                                        <fieldset>
                                            <label> Categoria </label>
                                            <Select onValueChange={(value) => setFieldValue("categoria", value)}>
                                                <SelectTrigger className={`${ errors.categoria && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] border bg-transparent px-6` }>
                                                    <SelectValue placeholder={<p className="text-[15px] opacity-50"> Selecione uma categoria </p>}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    { ['Audiovisual', 'Mobília', 'Informática', 'Telefonia'].map(item => (
                                                            <SelectItem key={item} value={item}> { item } </SelectItem>
                                                    )) }
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage component={FeedbackException} name="categoria"/>
                                        </fieldset>
                                        <fieldset>
                                            <label> Sala </label>
                                            <Select onValueChange={(value) => setFieldValue("sala", value)}>
                                                <SelectTrigger className={`${ errors.sala && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] border bg-transparent px-6` }>
                                                    <SelectValue asChild placeholder={<p className="text-[15px] opacity-50"> Selecione uma sala </p>}>
                                                        <p> { values.sala } </p>
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <Tabs defaultValue="Administrativo">
                                                        <TabsList className="flex">
                                                            { categories.sort().map(item => (
                                                                <TabsTrigger className="grow" key={item} value={item}> { item } </TabsTrigger>
                                                            )) }
                                                        </TabsList>
                                                        { categories.map(category => (
                                                            <TabsContent key={category} value={category}>
                                                                <ScrollArea className="h-[150px] pr-4">
                                                                    { orderRooms(salas).filter(item => item.descricao === category).map(item => (
                                                                        <SelectItem key={item.sala} value={item.sala}> { item.sala } </SelectItem>
                                                                    )) }
                                                                </ScrollArea>
                                                            </TabsContent>
                                                        )) }
                                                    </Tabs>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage component={FeedbackException} name="sala"/>
                                        </fieldset>
                                    </div>
                                    <div className="flex xl:flex-row flex-col gap-6 xl:*:w-1/2 *:w-full">
                                        <fieldset>
                                            <label> Lotação </label>
                                            <Field 
                                                as={Input}
                                                name="lotacao"
                                                placeholder="Informe a lotação" 
                                                className={`${ errors.lotacao && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] placeholder:text-[15px] px-6` }
                                            />
                                            <ErrorMessage component={FeedbackException} name="lotacao"/>
                                        </fieldset>
                                        <fieldset>
                                            <label> Nome </label>
                                            <Field 
                                                as={Input}
                                                name="nome"
                                                placeholder="Nome do equipamento" 
                                                className={`${ errors.nome && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] placeholder:text-[15px] px-6` }
                                            />
                                            <ErrorMessage component={FeedbackException} name="nome"/>
                                        </fieldset>
                                    </div>
                                </div>
                                <aside className="max-w-[450px] w-full">
                                    <div className="lg:block hidden bg-card rounded w-full p-8 space-y-4 sticky top-4">
                                        { Object.keys(initialValues).map(item => {

                                            const typedKey = item as keyof Omit<IEquipment, 'patrimonio' | 'situacao' | 'datacriacao'>
                                            let textReference;
                                            let icon

                                            switch (item) {
                                                case 'sala':
                                                    textReference = "Informe a localização do equipamento"
                                                    icon = (errors[typedKey] == undefined && values.sala == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'categoria': 
                                                    textReference = "Informe a categoria"
                                                    icon = (errors[typedKey] == undefined && values.categoria == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'nome': 
                                                    textReference = "Informe o nome do equipamento"
                                                    icon = (errors[typedKey] == undefined && values.nome == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'item':
                                                    textReference = "Informe um item válido"
                                                    icon = (errors[typedKey] == undefined && values.item == "") ? <Check size={19} color="#22c55e"/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'lotacao':
                                                    textReference = "Informe uma lotação válida"
                                                    icon = (errors[typedKey] == undefined && values.lotacao == "") ? <Check size={19} color="#22c55e"/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                }

                                            return (
                                                <div key={item} className="flex items-center gap-4">
                                                    { icon }
                                                    <p> { textReference } </p>
                                                </div>
                                            )
                                        }) }
                                    </div>

                                    <div className="flex items-center justify-end gap-6 mt-8 *:grow sticky top-[295px]">
                                        <Button asChild variant={"ghost"} type="button" className="h-[70px]"> 
                                            <Link href={"/equipamentos"}>
                                                Cancelar
                                            </Link>
                                        </Button>
                                        <Button type="submit" className="h-[70px]" onClick={() => setValidateOnChangeComplete(true)}> 
                                            <ChevronRight/>
                                        </Button>
                                    </div>
                                </aside>
                            </Form>
                        </div>
                    )}
                </Formik>
            </section>

            <Dialog open={open} onOpenChange={value => setOpen(value)}>
                <DialogContent className="sm:max-w-[700px]">
                    <Formik
                        validationSchema={Yup.object().shape({usuario: Yup.string().min(2, 'O usuário deve conter no mínimo 2 caracteres').max(20, 'O usuário deve conter no máximo 20 caracteres').required("Informe o nome de quem está adicionando")})}
                        initialValues={{ usuario: '' }}
                        validateOnBlur={false}
                        validateOnChange={validateOnChangeUser}
                        onSubmit={handleConfirmSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                <DialogHeader className="mb-4">
                                    <DialogTitle> Confirmar informações </DialogTitle>
                                    <DialogDescription> Confirme as informações passadas anteriormente no formulário </DialogDescription>
                                </DialogHeader>

                                <main className="flex gap-8">
                                    <section className="w-1/2 space-y-4">
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Número de Item </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipamento.item ?? "-" } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Lotação </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipamento.lotacao ?? "-" } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Sala </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipamento.sala } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Categoria </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipamento.categoria } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Nome </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipamento.nome } </p>
                                        </div>
                                    </section>
                                    <aside className="w-1/2 border-l pl-8">
                                        <DialogDescription> Informe o nome do usuário que está adicionando o equipamento </DialogDescription>
                                        <Field 
                                            as={Input} 
                                            name="usuario" 
                                            placeholder="Usuário"
                                            className={`mt-4 ${ errors.usuario && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" }` }
                                        />
                                        <ErrorMessage component={FeedbackException} name="usuario"/>
                                    </aside>
                                </main>

                                <DialogFooter>
                                    <DialogClose asChild> 
                                        <Button type="button" variant={"ghost"}> Cancelar </Button>
                                    </DialogClose>
                                    <Button disabled={isSubmitting} type="submit" onClick={() => setValidateOnChangeUser(true)}>
                                        { isSubmitting ? <Loading className="w-[25px] h-[25px]"/> : "Adicionar" }
                                    </Button>
                                </DialogFooter>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
         </main>
    )
}

export default CompleteForm
"use client"

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";

import * as Yup from 'yup'
import { Field, Form, Formik, ErrorMessage } from "formik";

import useSound from "use-sound"
import { Check, ChevronLeft, ChevronRight, Circle, CircleX, ScanBarcode, Undo2, X } from "lucide-react";
import useSWR, { preload } from "swr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeedbackException from "@/components/FeedbackException";
import Loading from "@/components/Loading";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import { IEquipment } from "@/interfaces/IEquipment";
import fetcher from "@/services/fetcher";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ITimeline } from "@/interfaces/ITimeline";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import ScanbotSDK from "scanbot-web-sdk/ui";


preload([`http://localhost:3000/api/equipamentos`], fetcher)

const PatrimonioSchema = Yup.object().shape({
    patrimonio: Yup.number()
        .required("O número do patrimônio é obrigatório")
        .typeError("O patrimônio deve ser um número")
})

const EquipmentSchema = Yup.object().shape({
    salaid: Yup.string()
        .min(2, "A sala deve conter pelo menos 2 caracteres")
        .max(30, "A sala deve ser menor que 30 caracteres")
        .required("A sala é obrigatória"),
    categoriaid: Yup.string()
        .required("A categoria é obrigatória"),
    item: Yup.number()
        .typeError("O item deve ser um número"),
    nomeid: Yup.string()
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
    salaid: '',
    categoriaid: '',
    nomeid: ''
}

export default function AddEquipment(): ReactElement {

    const [play] = useSound("/assets/beep.mp3")
    const [patrimonio, setPatrimonio] = useState<string | null>(null)
    const [currentForm, setCurrentForm] = useState<number>(0)

    useEffect(() => {
        if (patrimonio === null) return
        setCurrentForm(1)
    }, [patrimonio])

    if (currentForm === 0) return <PatrimonioForm handleForm={setPatrimonio}/>
    if (currentForm === 1) return <CompleteForm patrimonio={patrimonio} handleForm={setCurrentForm}/>
    
    return <p> Erro </p>
}

const PatrimonioForm = ({ handleForm }: { handleForm: (patrimonio: string) => void }) => {
    
    const { data, error } = useSWR([`http://localhost:3000/api/equipamentos`], fetcher)
    
    const handleSubmit = async (values: { patrimonio: string }, FormikHelpers: { setFieldError: (input: string, message: string) => void }) => {
        if (error) {
            FormikHelpers.setFieldError("patrimonio", "Houve um erro inesperado. Tente novamente mais tarde.")
            return
        }

        try {
            const exists = data.some((item: IEquipment) => item.patrimonio.toString() == values.patrimonio)
            if (exists) {
                FormikHelpers.setFieldError("patrimonio", "Já existe um equipamento com esse patrimônio")
                return
            }

            handleForm(values.patrimonio)
        } catch (error) {
            FormikHelpers.setFieldError("patrimonio", "Houve um erro ao checar o patrimônio. Tente novamente mais tarde")
        }
    }

    useEffect(() => {
        const init = async () => {
        await ScanbotSDK.initialize({
            licenseKey: "",
        });
        };

        init();
    }, []);
  
    const startScanner = async () => {
        const config = new ScanbotSDK.UI.Config.BarcodeScannerConfiguration();

        config.userGuidance.title.text = "Escaneie o código de barras"
        config.topBar.backgroundColor = "#000000"
        config.topBar.title.visible = false
        config.topBar.cancelButton.text = "Voltar"
        config.sound.successBeepEnabled = true
        config.vibration.enabled = true

        const result = await ScanbotSDK.UI.createBarcodeScanner(config);

        if (result && result.items.length > 0) {
            // sound()
            handleSubmitScan(result.items[0].text);
        }
        
        return result;
    }

    const handleSubmitScan = async (values: string) => {
        try {
            const exists = data.some((item: IEquipment) => item.patrimonio.toString() == values)
            if (exists) {
                throw new Error("Já existe um equipamento com esse patrimônio")
            }

            handleForm(values)
        } catch (error) {
            console.log("erro")
        }
    }

    return (
        <main className="min-h-dvh py-12 px-8 sm:p-20">
            <div className="absolute -z-[1] top-0 left-0 w-[calc(100dvw/2)] h-[calc(100dvh/2)] bg-[#545454] bg-[radial-gradient(at_left_top,_#545454,_#000000,_#000000)]"/>
            <header className="max-w-full w-[900px] mb-24">
                <p className="text-primary text-sm sm:text-lg tracking-[8px] mb-3"> CRIAR EQUIPAMENTO </p>
                <h1 className="text-4xl sm:text-6xl font-bold"> Adicionar equipamento ao sistema </h1>
            </header>
            <section className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
                <Formik
                    validationSchema={PatrimonioSchema}
                    initialValues={{ patrimonio: '' }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <div className="w-full grow relative">
                            <Form className="flex items-center gap-3">
                                <Field 
                                    as={Input}
                                    name="patrimonio"
                                    placeholder="Informe o patrimônio" 
                                    disabled={isSubmitting}
                                    className={`${ errors.patrimonio && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[150px] text-[36px] placeholder:text-[18px] px-12` }
                                />
                            </Form>
                            { isSubmitting &&
                                <div className="flex items-center justify-center w-[48px] h-[150px] absolute z-10 right-0 bottom-0">
                                    <Loading className="w-[35px] h-[35px] fill-white opacity-50"/>
                                </div>
                            }
                            <ErrorMessage component={FeedbackException} name="patrimonio"/>
                        </div>
                    )}
                </Formik>
                <div className="w-full lg:w-[1px] h-[1px] lg:h-[150px] bg-stone-700 flex items-center justify-center">
                    <p className="bg-background px-2 py-0 lg:py-2 lg:px-0 text-[12px] text-stone-600"> OU </p>
                </div>
                <Button onClick={startScanner} variant={"ghost"} className="flex items-center gap-3 h-[150px] w-full lg:w-fit px-8 border border-secondary *:opacity-60">
                    <ScanBarcode size={26}/>
                    <p className="text-[16px]"> Escanear plaqueta </p>
                </Button>
            </section>
         </main>
    )
}

const CompleteForm = ({ patrimonio, handleForm }: { patrimonio: string | null, handleForm: (current: number) => void }) => {
    
    const router = useRouter()
    const [validateOnChangeUser, setValidateOnChangeUser] = useState<boolean>(false)
    const [validateOnChangeComplete, setValidateOnChangeComplete] = useState<boolean>(false)

    const [open, setOpen] = useState<boolean>(false)
    const [confirmData, setConfirmData] = useState<{ equipment: IEquipment, timeline: Omit<ITimeline, 'id' | 'usuario'> } | undefined>(undefined)
    const handleSubmit = (values: Omit<IEquipment, 'patrimonio' | 'statusid' | 'datacriacao'>) => {
        setOpen(true)

        const newEquipmentData = {
            ...values,
            patrimonio: Number(patrimonio),
            statusid: 'Em uso',
            item: values.item === "" ? null : values.item,
            lotacao: values.lotacao === "" ? null : values.lotacao,
            datacriacao: new Date()
        }

        const newTimelineData = {
            patrimonio: Number(patrimonio),
            dataalteracao: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            statusanterior: 'Em uso',
            statusatual: 'Em uso',
            descricao: "Equipamento adicionado ao sistema",
            observacao: null,
            importante: false
        }

        setConfirmData({
            equipment: newEquipmentData,
            timeline: newTimelineData,
        })
    }

    const handleConfirmSubmit = (values: { usuario: string }) => {
        try {
            axios.post("http://localhost:3000/api/equipamentos", confirmData?.equipment)
            axios.post("http://localhost:3000/api/historico", {
                ...confirmData?.timeline,
                usuario: values.usuario
            })

            router.replace("/equipamentos")
        } catch (e) {
            setOpen(false)
            toast({
                description: (
                    <div className="flex items-center gap-3">
                        <CircleX size={18} color="#d63e3e"/>
                        <p> Houve um erro ao adicionar o equipamento. Tente novamente mais tarde </p>
                    </div>
                )
            })
        }
    }

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
                            <Form className="lg:flex justify-between gap-16 mt-4 *:grow form-with-label">
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
                                    <div className="flex xl:flex-row flex-col gap-6 *:grow">
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
                                            <label> Sala </label>
                                            <Field 
                                                as={Input}
                                                name="salaid"
                                                placeholder="Informe onde está o equipamento" 
                                                className={`${ errors.salaid && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] placeholder:text-[15px] px-6` }
                                            />
                                            <ErrorMessage component={FeedbackException} name="salaid"/>
                                        </fieldset>
                                    </div>
                                    <div className="flex xl:flex-row flex-col gap-6 *:grow">
                                        <fieldset>
                                            <label> Categoria </label>
                                            <Select onValueChange={(value) => setFieldValue("categoriaid", value)}>
                                                <SelectTrigger className={`${ errors.categoriaid && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] border bg-transparent px-6` }>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    { ['Audiovisual', 'Mobília', 'Informática', 'Telefonia'].map(item => (
                                                            <SelectItem key={item} value={item}> { item } </SelectItem>
                                                    )) }
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage component={FeedbackException} name="categoriaid"/>
                                        </fieldset>
                                        <fieldset>
                                            <label> Nome </label>
                                            <Field 
                                                as={Input}
                                                name="nomeid"
                                                placeholder="Nome do equipamento" 
                                                className={`${ errors.nomeid && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[60px] text-[18px] placeholder:text-[15px] px-6` }
                                            />
                                            <ErrorMessage component={FeedbackException} name="nomeid"/>
                                        </fieldset>
                                    </div>
                                </div>
                                <aside className="max-w-[450px] w-full">
                                    <div className="lg:block hidden bg-card rounded w-full p-8 space-y-4 sticky top-4">
                                        { Object.keys(initialValues).map(item => {

                                            const typedKey = item as keyof Omit<IEquipment, 'patrimonio' | 'statusid' | 'datacriacao'>
                                            let textReference;
                                            let icon

                                            switch (item) {
                                                case 'salaid':
                                                    textReference = "Informe a localização do equipamento"
                                                    icon = (errors[typedKey] == undefined && values.salaid == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'categoriaid': 
                                                    textReference = "Informe a categoria"
                                                    icon = (errors[typedKey] == undefined && values.categoriaid == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
                                                    break
                                                case 'nomeid': 
                                                    textReference = "Informe o nome do equipamento"
                                                    icon = (errors[typedKey] == undefined && values.nomeid == "") ? <Circle size={19} opacity={.2}/> : errors[typedKey] == undefined ? <Check size={19} color="#22c55e"/> : <X size={19} color="#ef4444"/>
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

                                { errors.usuario && <FeedbackException> { errors.usuario } </FeedbackException> } 
                                <main className="flex gap-8">
                                    <section className="w-1/2 space-y-4">
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Número de Item </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipment.item ?? "-" } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Lotação </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipment.lotacao ?? "-" } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Sala </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipment.salaid } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Categoria </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipment.categoriaid } </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm ml-1"> Nome </p>
                                            <p className="rounded px-3 py-2 bg-card"> { confirmData?.equipment.nomeid } </p>
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
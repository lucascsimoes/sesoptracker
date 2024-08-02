"use client"

import { ReactElement, useEffect, useState } from "react";

import * as Yup from 'yup'
import { Field, Form, Formik, ErrorMessage } from "formik";
import { ChevronLeft, ChevronRight, ScanBarcode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeedbackException from "@/components/FeedbackException";
import axios from "axios";
import { IEquipment } from "@/interfaces/IEquipment";
import Loading from "@/components/Loading";

const EquipmentSchema = Yup.object().shape({
    salaid: Yup.string()
        .min(2, "A sala deve conter pelo menos 2 caracteres")
        .max(20, "A sala deve ser menor que 20 caracteres")
        .required("A sala é obrigatória"),
    categoriaid: Yup.string()
        .required("A categoria é obrigatória"),
    item: Yup.string()
        .min(2, "O item deve conter pelo menos 2 caracteres")
        .max(20, "O item deve ser menor que 20 caracteres"),
    nomeid: Yup.string()
        .min(2, "O nome do equipamento deve conter pelo menos 2 caracteres")
        .max(20, "O nome do equipamento deve ser menor que 20 caracteres")
        .required("O nome do equipamento é obrigatório"),
    lotacao: Yup.string()
        .min(2, "A lotação do equipamento deve conter pelo menos 2 caracteres")
        .max(20, "A lotação do equipamento deve ser menor que 20 caracteres")
})

const initialValues = {
    salaid: '',
    categoriaid: '',
    item: '',
    nomeid: '',
    lotacao: ''
}

export default function AddEquipment(): ReactElement {

    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [patrimonio, setPatrimonio] = useState<Pick<IEquipment, "patrimonio"> | null>(null)
    const [currentForm, setCurrentForm] = useState<number>(0)

    useEffect(() => {
        const isMobileDevice = /mobile/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice)
    }, [])

    
    const handleSubmitPatrimonio = async (values: { patrimonio: string }) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/equipamentos?patrimonio=${values.patrimonio}`)
            if (data.length) {
                console.log("Já existe um equipamento com esse patrimônio") 
                return
            }
            
            setCurrentForm(1)
        } catch (error) {
            console.log("Houve um erro ao checar o patrimônio. Tente novamente mais tarde")
            return
        }
    }

    const handleSubmit = async (values: any) => {
        console.log(values)
    }

    return (
        <main className="flex flex-col justify-center gap-24 w-full h-dvh p-16">
            <header className="*:text-center">
                <p className="text-primary text-[13px] tracking-[8px]"> CRIAR EQUIPAMENTO </p>
                <h1 className="text-4xl font-bold"> Adicionar equipamento ao sistema </h1>
            </header>
            <section className="max-w-full w-[500px] mx-auto">
                { currentForm === 0 && <PatrimonioForm submit={handleSubmitPatrimonio}/> }
                { currentForm === 1 && (
                    <>
                        <div className="rounded py-2 px-4 flex items-center gap-4 bg-card">
                            <Button variant={"ghost"} className="p-2">
                                <ChevronLeft size={16}/>
                            </Button>
                            <span className="opacity-50 text-[14px] italic"> Patrimônio: </span>
                            <p> { "a" } </p>
                        </div>
                        <CompleteForm submit={handleSubmit}/>
                    </>
                ) }
                

                <div className="h-[1px] bg-white flex items-center justify-center opacity-30 my-8">
                    <p className="bg-background px-2 text-[12px]"> OU </p>
                </div>

                <Button disabled={!isMobile} variant={"secondary"} className="flex items-center gap-3 w-full py-7 *:opacity-60">
                    <ScanBarcode/>
                    <p> Escanear plaqueta </p>
                </Button>
            </section>
        </main>
    )
}

const PatrimonioForm = ({ submit }: { submit: (values: { patrimonio: string }) => void }) => (
    <Formik
        validationSchema={Yup.object().shape({ patrimonio: Yup.string().max(20, "O patrimônio deve ser menor que 20 caracteres").required("O número do patrimônio é obrigatório") })}
        initialValues={{ patrimonio: '' }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={submit}
    >
        {({ isSubmitting }) => (
            <>
            <ErrorMessage component={FeedbackException} name="patrimonio"/>
            <Form className="flex items-center gap-3 h-[55px] mt-4">
                <Field 
                    as={Input}
                    name="patrimonio"
                    placeholder="Patrimônio" 
                    className="h-full text-[17px]"
                />
                <Button disabled={isSubmitting} type="submit" className="min-w-[55px] w-0 h-full p-0">
                    { isSubmitting ? <Loading className="w-6 h-6 fill-white"/> : <ChevronRight size={21}/> }
                </Button>
            </Form>
            </>
        )}
    </Formik>
)

const CompleteForm = ({ submit }: { submit: (values: Pick<IEquipment, 'salaid' | 'categoriaid' | 'item' | 'nomeid' | 'lotacao'>) => void }) => (
    <Formik
        validationSchema={EquipmentSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={submit}
    >
        {({ isSubmitting }) => (
            <>
            <ErrorMessage component={FeedbackException} name="patrimonio"/>
            <Form className="flex items-center gap-3 h-[55px] mt-4">
                <Field 
                    as={Input}
                    name="patrimonio"
                    placeholder="Item" 
                    className="h-full text-[17px]"
                />
                <Button disabled={isSubmitting} type="submit" className="min-w-[55px] w-0 h-full p-0">
                    { isSubmitting ? <Loading className="w-6 h-6 fill-white"/> : <ChevronRight size={21}/> }
                </Button>
            </Form>
            </>
        )}
    </Formik>
)
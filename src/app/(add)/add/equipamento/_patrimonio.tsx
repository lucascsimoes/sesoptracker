// "use client"

import * as Yup from 'yup'
import { Field, Form, Formik, ErrorMessage } from "formik";
import { ChevronLeft, ScanBarcode } from "lucide-react";
import useSWR, { preload } from "swr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeedbackException from "@/components/FeedbackException";
import Loading from "@/components/Loading";
import { IEquipment } from "@/interfaces/IEquipment";
import fetcher from "@/services/fetcher";
import Link from 'next/link';

preload([`http://localhost:3000/api/equipamentos`], fetcher)

const PatrimonioSchema = Yup.object().shape({
    patrimonio: Yup.string()
        .required("O número do patrimônio é obrigatório")
})

const PatrimonioForm = ({ handleForm, startScanner }: { handleForm: (patrimonio: string) => void, startScanner: () => void }) => {
    
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

    return (
        <main className="flex flex-col items-center justify-center min-h-dvh p-2 relative">
            <Link href="/equipamentos" className='absolute top-10 left-10 flex items-center gap-2'>
                <ChevronLeft size={18}/>
                <p className='text-[17px]'> voltar </p>
            </Link>
            <div className="absolute -z-[1] top-0 left-0 w-[calc(100dvw/2)] h-[calc(100dvh/2)] bg-[#545454] bg-[radial-gradient(at_left_top,_#545454,_#000000,_#000000)]"/>
            
            <h1 className="text-lg sm:text-2xl font-bold text-center mb-16"> Adicionar equipamento ao sistema </h1>

            <section className="flex flex-col gap-4 max-w-full w-[420px] max-h-full">
                <div className='w-full h-full rounded bg-card border border-secondary p-8'>
                    <Formik
                        validationSchema={PatrimonioSchema}
                        initialValues={{ patrimonio: '' }}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, setFieldError }) => (
                            <Form>
                                <fieldset className='w-full space-y-3'>
                                    <label> Patrimônio </label>
                                    <Field 
                                        as={Input}
                                        name="patrimonio"
                                        placeholder="Informe o patrimônio" 
                                        disabled={isSubmitting}
                                        onKeyDown={() => setFieldError("patrimonio", undefined)}
                                        className={`${ errors.patrimonio && "ring-1 ring-red-500 ring-offset-2 focus-visible:ring-red-500" } h-[55px] text-[16px] placeholder:text-[14px]` }
                                    />
                                </fieldset>
                                <ErrorMessage component={FeedbackException} name="patrimonio"/>
                                <Button type='submit' className='w-full mt-6'> 
                                    { isSubmitting ? <Loading className="w-[35px] h-[35px]"/> : "Checar patrimônio " }
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Button onClick={startScanner} variant={"ghost"} className="flex items-center gap-3 h-[60px] w-full px-2 rounded border border-secondary *:opacity-60 mt-auto">
                    <ScanBarcode size={22}/>
                    <p className="text-[15px] font-[400]"> Escanear plaqueta </p>
                </Button>
            </section>
         </main>
    )
}

export default PatrimonioForm
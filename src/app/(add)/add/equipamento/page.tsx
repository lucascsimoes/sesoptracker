"use client"

import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation"

import useSound from "use-sound"
import useSWR, { preload } from "swr";
import ScanbotSDK from "scanbot-web-sdk/ui";

import { toast } from "@/components/ui/use-toast";
import { IEquipment } from "@/interfaces/IEquipment";
import fetcher from "@/services/fetcher";

import CompleteForm from "./_complete";
import PatrimonioForm from "./_patrimonio";

preload(["http://localhost:3000/api/equipamentos", "http://localhost:3000/api/salas"], fetcher)

export default function AddEquipment(): ReactElement {

    const router = useRouter()
    const { data } = useSWR(["http://localhost:3000/api/equipamentos", "http://localhost:3000/api/salas"], fetcher)

    const [play] = useSound("/assets/beep.mp3")
    const [patrimonio, setPatrimonio] = useState<string | null>(null)
    const [currentForm, setCurrentForm] = useState<number>(0)

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
            play()
            handleSubmitScan(result.items[0].text);
        }
        
        return result;
    }

    const handleSubmitScan = async (values: string) => {
        try {
            const exists = data.equipamentos.some((item: IEquipment) => item.patrimonio.toString() == values)
            if (exists) {
                toast({
                    variant: "destructive",
                    description: "Já existe um equipamento com esse patrimônio"
                })
            } else {
                setCurrentForm(1)
            }

        } catch (error) {
            toast({
                variant: "destructive",
                description: "Houve um erro inesperado. Tente novamente mais tarde"
            })
        }
    }

    useEffect(() => {
        if (patrimonio === null) return
        setCurrentForm(1)
    }, [patrimonio])

    if (currentForm === 0) return <PatrimonioForm handleForm={setPatrimonio} startScanner={startScanner}/>
    if (currentForm === 1) return <CompleteForm patrimonio={patrimonio} salas={data.salas} handleForm={setCurrentForm}/>
    
    return <p> Erro </p>
}
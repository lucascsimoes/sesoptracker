import { useEffect, useState } from "react"

import { IEquipment } from "@/interfaces/IEquipment"
import { ITimeline } from "@/interfaces/ITimeline"

interface EquipmentTimeline {
    equipment: IEquipment | null
    timeline: ITimeline[]
}

export const EquipmentService = {
    get: (id?: string) => {
        const [data, setData] = useState<IEquipment[] | EquipmentTimeline>(
            id === undefined ? [] : { equipment: null, timeline: [] }
        )
        const [isLoading, setLoading] = useState<boolean>(true)
        const [error, setError] = useState<null | string>(null)

        useEffect(() => {
            const fetchData = async () => {
                try {
                    if (id === undefined) {
                        const response = await fetch('/data/equipamentos.json');
                        const equipmentData: IEquipment[] = await response.json();
                        setData(equipmentData);
                    } else {
                        const equipmentResponse = await fetch('/data/equipamentos.json');
                        const equipmentData: IEquipment[] = await equipmentResponse.json();
                        const filteredEquipment = equipmentData.filter(item => item.Patrimonio.toString() === id);

                        const historyResponse = await fetch('/data/historico.json');
                        const historyData: ITimeline[] = await historyResponse.json();

                        setData({
                            equipment: filteredEquipment.length > 0 ? filteredEquipment[0] : null,
                            timeline: historyData
                        });
                    }
                } catch (error) {
                    setError("Ocorreu um erro ao obter os dados. Tente novamente mais tarde.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [id]);
    
        return { data, isLoading, error }
    }
}
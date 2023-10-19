import { useState, useEffect } from 'react'

interface EquipmentHistoric {
    data: string,
    descricao: string
}

interface EquipmentList {
    item: string,
    patrimonio: string,
    nome: string,
    tipo: string,
    local: string,
    emManutencao: boolean,
    historico: EquipmentHistoric[]
}

export default () => {

    const [data, setData] = useState<EquipmentList[] | undefined>(undefined)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        fetch("./data/data.json")
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => {
                console.error("Não foi possível acessar os dados. ", e)
            })
    }

    return data

}
import { useState, useEffect } from 'react'
import * as Styled from './style'

import Search from '../../components/Search/Search'
import Filter from '../../components/Filter/Filter';
import Equipment from '../../components/Equipment/Equipment';

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

    const [historicData, setHistoricData] = useState<EquipmentList>();

    const [data, setData] = useState<EquipmentList>()
    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        fetch("./data/data.json")
            .then(r => r.json())
            .then(r => setData(r))
            .catch(e => {
                console.error("Não foi possível acessar os dados. ", e)
                setData(undefined)
            })
    }

    useEffect(() => {
        console.log(historicData)
    }, [historicData])

    // const [search, setSearch] = useState('');
    // useEffect(() => {
    //     console.log(search)
    // }, [search])

    return (
        <Styled.Container>
            <Styled.Title> SESOP<span>tracker</span> </Styled.Title>
            <Styled.Subtitle> Encontre todos os equipamentos lotados na ESAJ, veja seu histórico, localização, números de identificação e muito mais </Styled.Subtitle>
             
            <Styled.Filters>
                <Search />
                <Filter />
            </Styled.Filters>

            
            { data == undefined || Array(data).flat().length == 0 ?
                <>
                <h2> Não foi encontrado nenhum equipamento </h2>
                <p> Tente alterar os filtros. Se mesmo assim não conseguir, tente novamente mais tarde </p>
                </>
                :
                <Styled.Table>
                    <header>
                        <p> Tipo </p>
                        <p> Patrimônio </p>
                        <p> Item </p>
                        <p> Nome </p>
                        <p> Local </p>
                    </header>
                    {Array(data).flat().map((item:EquipmentList) => (
                        <Equipment 
                            data={item}
                            openHistoric={setHistoricData}/>
                    ))}   
                </Styled.Table>
            }
        </Styled.Container>
    )
}
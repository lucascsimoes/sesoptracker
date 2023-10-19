import { useState, useEffect } from 'react'
import * as Styled from './style'

import data from '../../fetch'

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

    return (
        <Styled.Container>
            <Styled.Title> SESOP<span>tracker</span> </Styled.Title>
            <Styled.Subtitle> Encontre todos os equipamentos lotados na ESAJ, veja seu histórico, localização, números de identificação e muito mais </Styled.Subtitle>
             
            <Styled.Filters>
                <Search />
                <Filter />
            </Styled.Filters>

            { data()?.map((item:EquipmentList) => (
                    <Equipment data={item}/>
                ))
                ??
                <>
                    <h2> Não foi encontrado nenhum equipamento </h2>
                    <p> Tente alterar os filtros. Se mesmo assim não conseguir, tente novamente mais tarde </p>
                </>
            }
        </Styled.Container>
    )
}
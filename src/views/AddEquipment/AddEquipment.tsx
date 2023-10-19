import { useState, useEffect } from 'react'
import * as Styled from './style'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

interface ToDoProps {
    patrimonio: string | null
    item: string | null
    nome: string | null
    tipo: string | null
    local: string | null
    emManutencao: boolean | null
}

export default () => {

    const [currentTab, setCurrentTab] = useState<number>(0)
    const changeTab = (value: number) => {
        setCurrentTab(value);
      };

    const [patrimonioValue, setPatrimonioValue] = useState<string>("");
    const [itemValue, setItemValue] = useState<string>("");
    const [nomeValue, setNomeValue] = useState<string>("");
    const [localValue, setLocalValue] = useState<string>("");
    const [emManutencaoValue, setEmManutencaoValue] = useState<boolean | null>(null);

    useEffect(() => {
        setToDo((oldValues) => ({ ...oldValues, patrimonio: patrimonioValue != "" ? patrimonioValue : null }))
    }, [patrimonioValue])

    useEffect(() => {
        setToDo((oldValues) => ({ ...oldValues, item: itemValue != "" ? itemValue : null }))
    }, [itemValue])

    useEffect(() => {
        setToDo((oldValues) => ({ ...oldValues, nome: nomeValue != "" ? nomeValue : null }))
    }, [nomeValue])

    useEffect(() => {
        setToDo((oldValues) => ({ ...oldValues, local: localValue != "" ? localValue : null }))
    }, [localValue])

    useEffect(() => {
        setToDo((oldValues) => ({ ...oldValues, emManutencao: emManutencaoValue }))
    }, [localValue])

    const [toDo, setToDo] = useState<ToDoProps>({
        patrimonio: null,
        item: null,
        nome: null,
        tipo: null,
        local: null,
        emManutencao: false
    })

    useEffect(() => {
        console.log(Object.values(toDo))
    }, [toDo])

    return (
        <Styled.Container>
            <aside>
                <section>
                    <Styled.ToDoItem isEmpty={toDo.patrimonio == null}>
                        <div>
                            { toDo.patrimonio != null && <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 128L192 384l-96-96"/></svg> }   
                        </div>
                        <p> Informe o número de patrimônio </p>
                    </Styled.ToDoItem>
                    <Styled.ToDoItem isEmpty={toDo.item == null}>
                        <div>
                            { toDo.item != null && <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 128L192 384l-96-96"/></svg> }   
                        </div>
                        <p> Informe o número de item </p>
                    </Styled.ToDoItem>
                    <Styled.ToDoItem isEmpty={toDo.nome == null}>
                        <div>
                            { toDo.nome != null && <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 128L192 384l-96-96"/></svg> }   
                        </div>
                        <p> Informe o nome do equipamento </p>
                    </Styled.ToDoItem>
                    <Styled.ToDoItem isEmpty={toDo.tipo == null}>
                        <div>
                            { toDo.tipo != null && <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 128L192 384l-96-96"/></svg> }   
                        </div>
                        <p> Informe o tipo do equipamento </p>
                    </Styled.ToDoItem>
                    <Styled.ToDoItem isEmpty={toDo.local == null}>
                        <div>
                            { toDo.local != null && <svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M416 128L192 384l-96-96"/></svg> }   
                        </div>
                        <p> Informe a localização </p>
                    </Styled.ToDoItem>
                </section>
                <button type='submit' disabled> Adicionar equipamento </button>
            </aside>
            <main>
                <h2> Preencha as informações para adicionar </h2>

                <Styled.SwitchTabs value={currentTab}>
                    <Styled.Tab onClick={() => changeTab(0)} active={currentTab == 0}> Informações </Styled.Tab>
                    <Styled.Tab onClick={() => changeTab(1)} active={currentTab == 1}> Histórico </Styled.Tab>
                </Styled.SwitchTabs>

                <Styled.Panel visible={currentTab == 0}>
                    <Styled.FormField>
                        <input type="text" id='createPatrimonio' value={patrimonioValue} onChange={e => setPatrimonioValue(e.target.value)}/>
                        <legend> Número de Patrimônio <span>*</span> </legend>
                    </Styled.FormField>

                    <Styled.FormField>
                        <input type="text" id='createItem' value={itemValue} onChange={e => setItemValue(e.target.value)}/>
                        <legend> Número de Item <span>*</span> </legend>
                    </Styled.FormField>

                    <Styled.FormField>
                        <input type="text" id='createNome' value={nomeValue} onChange={e => setNomeValue(e.target.value)}/>
                        <legend> Nome do Equipamento <span>*</span> </legend>
                    </Styled.FormField>

                    <Styled.FormField>
                        <input type="text" id='createLocal' value={localValue} onChange={e => setLocalValue(e.target.value)}/>
                        <p> SALA: </p>
                        <legend> Localização do Equipamento <span>*</span> </legend>
                    </Styled.FormField>
                </Styled.Panel>

                <Styled.Panel visible={currentTab == 1}>
                    <Styled.FormField>
                        <input type="text" id='createPatrimonio' value={patrimonioValue} onChange={e => setPatrimonioValue(e.target.value)}/>
                        <legend> Número de Patrimônio <span>*</span> </legend>
                    </Styled.FormField>
                </Styled.Panel>
            </main>
        </Styled.Container>
    )
}
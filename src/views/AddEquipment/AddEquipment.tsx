import { useState, useEffect } from 'react'
import * as Styled from './style'

interface ToDoProps {
    patrimonio: string | null
    item: string | null
    nome: string | null
    tipo: string | null
    local: string | null
    emManutencao: boolean | null
}

export default () => {

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

                <Styled.FormField>
                    <button type='button' onClick={() => setEmManutencaoValue(true)} className={emManutencaoValue == true ? "active" : ""}>
                        <svg viewBox="0 0 512 512"><path d="M436.67 184.11a27.17 27.17 0 01-38.3 0l-22.48-22.49a27.15 27.15 0 010-38.29l50.89-50.89a.85.85 0 00-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 01-7.67 27.14l-173 160.76a40.76 40.76 0 1057.57 57.54l162.15-173.3a27 27 0 0126.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94 27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 00-1.36-.22z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="20"/><path d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 01-3.33-21.35 20.76 20.76 0 013.5-4.62l15.68-15.29a18.66 18.66 0 015.63-3.87 18.11 18.11 0 0120 3.62c5.45 5.29 15.43 15 33.41 32.52M317.07 291.3c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 01.94 19.92L394.63 444a14 14 0 01-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/><path d="M17.34 193.5l29.41-28.74a4.71 4.71 0 013.41-1.35 4.85 4.85 0 013.41 1.35h0a9.86 9.86 0 008.19 2.77c3.83-.42 7.92-1.6 10.57-4.12 6-5.8-.94-17.23 4.34-24.54a207 207 0 0119.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.31 107.31 0 01206.67 64c22.59 0 40 10 46.26 15.67a89.54 89.54 0 0110.28 11.64 78.92 78.92 0 00-9.21-2.77 68.82 68.82 0 00-20-1.26c-13.33 1.09-29.41 7.26-38 14-13.9 11-19.87 25.72-20.81 44.71-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 01-.34 9.16l-18.22 18a6.88 6.88 0 01-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 00-18.27 3.87 11.39 11.39 0 00-2.64 2 14.14 14.14 0 00.42 20.08l1.71 1.6a4.63 4.63 0 010 6.64L71.73 246.6a4.71 4.71 0 01-3.41 1.4 4.86 4.86 0 01-3.41-1.35l-47.57-46.43a4.88 4.88 0 010-6.72z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/></svg>
                        <p> Em Manutenção </p>
                    </button>
                    <button type='button' onClick={() => setEmManutencaoValue(false)} className={emManutencaoValue == false ? "active" : ""}>
                        <svg viewBox="0 0 512 512"><path d="M436.67 184.11a27.17 27.17 0 01-38.3 0l-22.48-22.49a27.15 27.15 0 010-38.29l50.89-50.89a.85.85 0 00-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 01-7.67 27.14l-173 160.76a40.76 40.76 0 1057.57 57.54l162.15-173.3a27 27 0 0126.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94 27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 00-1.36-.22z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="20"/><path d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 01-3.33-21.35 20.76 20.76 0 013.5-4.62l15.68-15.29a18.66 18.66 0 015.63-3.87 18.11 18.11 0 0120 3.62c5.45 5.29 15.43 15 33.41 32.52M317.07 291.3c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 01.94 19.92L394.63 444a14 14 0 01-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/><path d="M17.34 193.5l29.41-28.74a4.71 4.71 0 013.41-1.35 4.85 4.85 0 013.41 1.35h0a9.86 9.86 0 008.19 2.77c3.83-.42 7.92-1.6 10.57-4.12 6-5.8-.94-17.23 4.34-24.54a207 207 0 0119.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.31 107.31 0 01206.67 64c22.59 0 40 10 46.26 15.67a89.54 89.54 0 0110.28 11.64 78.92 78.92 0 00-9.21-2.77 68.82 68.82 0 00-20-1.26c-13.33 1.09-29.41 7.26-38 14-13.9 11-19.87 25.72-20.81 44.71-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 01-.34 9.16l-18.22 18a6.88 6.88 0 01-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 00-18.27 3.87 11.39 11.39 0 00-2.64 2 14.14 14.14 0 00.42 20.08l1.71 1.6a4.63 4.63 0 010 6.64L71.73 246.6a4.71 4.71 0 01-3.41 1.4 4.86 4.86 0 01-3.41-1.35l-47.57-46.43a4.88 4.88 0 010-6.72z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20"/></svg>
                        <p> Disponível </p>
                    </button>
                </Styled.FormField>
            </main>
        </Styled.Container>
    )
}
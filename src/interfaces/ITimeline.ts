export interface ITimeline {
    Patrimonio: number,
    DataAlteracao: string,
    StatusAnterior: string,
    StatusAtual: string,
    Usuario: string,
    Descricao: string,
    Observacao: string | null,
    Desconsiderar: boolean,
    Importante: boolean
}
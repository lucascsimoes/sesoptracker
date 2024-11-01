export interface ITimeline {
    id: number
    patrimonio: string,
    dataalteracao: string,
    situacaoanterior: string,
    situacaoatual: string,
    usuario: string,
    descricao: string,
    observacao: string | null,
    importante: boolean
}
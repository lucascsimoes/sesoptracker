export interface ITimeline {
    id: number
    patrimonio: number,
    dataalteracao: string,
    statusanterior: string,
    statusatual: string,
    usuario: string,
    descricao: string,
    observacao: string | null,
    importante: boolean
}
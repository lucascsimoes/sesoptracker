export const statusColor = (status: string): string => {
    switch (status) {
        case "Em manutenção":
            return "#ebdb28"
        case "Com defeito":
            return "#d13e3e"
        case "Transferido":
            return "#33a5e3"
        case "Devolvido":
            return "#44cd38"
        case "Emprestado":
            return "#b933a9"
        case "Inutilizado":
            return "#1d1d1d"
        default: 
            return "#a0a0a0"
    }   
}
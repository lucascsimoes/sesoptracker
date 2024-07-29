import { ReactNode } from "react"
import { statusColor } from "@/services/statusColor"

const element = (label: string) => <div className="flex items-center gap-4"><div style={{ background: statusColor(label) }} className="w-[7px] h-[7px] rounded-full"></div><p className="text-[13px]"> { label } </p></div> 
export const showStatus = [
    { value: "todos", label: "Todos" },
    { value: "em uso", label: "Em uso", element: element("Em uso") },
    { value: "em manutenção", label: "Em manutenção", element: element("Em manutenção") },
    { value: "com defeito", label: "Com defeito", element: element("Com defeito") },
    { value: "transferido", label: "Transferido", element: element("Transferido") },
    { value: "devolvido", label: "Devolvido", element: element("Devolvido") },
    { value: "emprestado", label: "Emprestado", element: element("Emprestado") }
];
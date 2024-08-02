import { Layers3, Plus, CaseUpper } from "lucide-react"

export const iconByDescription = (type: string) => {
    switch (type) {
        case "adicionado":
            return <Plus size={16}/>
        case "status":
            return <Layers3 size={16}/>
        default:
            return <CaseUpper size={16}/>
    }
}
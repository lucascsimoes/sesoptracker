import { useEffect, useState } from "react"

interface CategoryProps {
    id: number
    category: string
    value: string
}

export const CategoryService = {
    get: () => {
        const [data, setData] = useState<CategoryProps[]>([])
        const [isLoading, setLoading] = useState(true)
    
        useEffect(() => {
            fetch('/data/categorias.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
        }, [])

        return { data, isLoading }
    }
}
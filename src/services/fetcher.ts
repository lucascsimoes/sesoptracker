import axios from "axios"

export default async function fetcher([...urls]: string[]) {
    const f = (url: string) => axios.get(url).then(response => response.data)
    if (urls.length > 1) {
        const promise = await Promise.all(urls.map(f))
        return {
            equipment: promise[1][0],
            timeline: promise[0]
        }
    }

    return f(urls[0])
}
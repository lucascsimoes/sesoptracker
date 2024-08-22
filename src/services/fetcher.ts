import axios from "axios"

function replaceNulls(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(replaceNulls);
    } else if (obj !== null && typeof obj === 'object') {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === null) {
                    newObj[key] = "-";
                } else {
                    newObj[key] = replaceNulls(obj[key]);
                }
            }
        }
        return newObj;
    }
    return obj;
}

export default async function fetcher([...urls]: string[]) {
    const f = (url: string) => axios.get(url).then(response => {
        return replaceNulls(response.data);
    } )
    if (urls.length > 1) {
        const promise = await Promise.all(urls.map(f))
        return {
            equipment: promise[1][0],
            timeline: promise[0]
        }
    }

    return f(urls[0])
}
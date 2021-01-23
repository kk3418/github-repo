import {useState, useEffect} from 'react'
import {getData} from './get-data'

type Args = {
    repos_url: string,
}

export function useLoading({repos_url}: Args) {
    const [list, setList] = useState<
        undefined | Array<any>
    >(undefined)

    useEffect(() => {
        const option = {
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
            params: {
                type: 'public', 
                sort: 'created', 
                direction: 'asc',
                per_page: 15,
            }
        }
        getData(repos_url, option).then(res => setList(res?.data))
    }, [repos_url])

    return [list]
}
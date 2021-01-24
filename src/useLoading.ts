import {useState, useEffect} from 'react'
import {RepoData} from './response-type'
import {getData} from './get-data'
import {createObserver} from './observer'

type Args = {
    repos_url: string,
}

export function useLoading({repos_url}: Args) {
    const [list, setList] = useState<undefined | Array<RepoData>>(undefined)
    const [page, setPage] = useState<number>(1)

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
                per_page: 5,
            }
        }
        getData(repos_url, option).then(res => setList(res?.data))
    }, [repos_url, page])
    
    
    return {list}
}
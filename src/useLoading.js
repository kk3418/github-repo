import {useState, useEffect} from 'react'
import {getData} from './get-data'

export function useLoading({repos_url}) {
    const [list, setList] = useState(undefined)

    useEffect(() => {
        if (repos_url === undefined) return () => null
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
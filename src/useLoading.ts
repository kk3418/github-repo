import {useState, useEffect} from 'react'
import {RepoData} from './response-type'
import {getData} from './get-data'
import {createObserver} from './observer'

interface Args {
    repos_url: string,
    targetRef: React.RefObject<any>,
}

export function useLoading({repos_url, targetRef}: Args) {
    const [list, setList] = useState<undefined | Array<RepoData>>(undefined)
    const [page, setPage] = useState<number>(1)
    // 修改list有時無法重置的bug 
    // 用下面的可以改善但還是會有些無法預測的情況
    useEffect(() => {
        setList(undefined)
    }, [repos_url])

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
                page: page,
            }
        }
        getData(repos_url, option)
        .then(res => setList(prevList => {
            if (prevList) return [...prevList, ...res?.data]
            else return res?.data
        }))
    }, [repos_url, page])

    useEffect(() => {
        const IntersectionObserver = createObserver(setPage)
        if (targetRef.current) {
            IntersectionObserver.observe(targetRef.current)
        }
        return () => IntersectionObserver.disconnect()
    }, [targetRef])

    return {list}
}
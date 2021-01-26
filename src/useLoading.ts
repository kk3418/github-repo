import {useState, useEffect} from 'react'
import {RepoData} from './response-type'
import {getData} from './get-data'
import {createObserver} from './observer'

interface Args {
    repos_url: string,
    targetRef: React.RefObject<any>,
}

export function useLoading({repos_url, targetRef}: Args) {
    const [list, setList] = useState<RepoData[]>([])
    const [page, setPage] = useState<number>(0)

    useEffect(() => {
        setList([])
    }, [repos_url])

    useEffect(() => {
        const option = {
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
            params: {
                type: 'all', 
                sort: 'updated', 
                direction: 'desc',
                per_page: 5,
                page: page,
            }
        }
        repos_url && getData(repos_url, option)
            .then(res => {
                if (res?.data.length === 0) {
                    setPage(lastPage => lastPage)
                }
                setList(prevList => {
                    if (!res?.data) return [...prevList]
                    return [...prevList, ...res?.data]
                })
            })
        console.log(page)
    }, [repos_url, page])

    useEffect(() => {
        const IntersectionObserver = createObserver(setPage)
        const targetElement = targetRef.current
        if (targetElement) {
            IntersectionObserver.observe(targetElement)
        }
    }, [targetRef])

    return [list]
}
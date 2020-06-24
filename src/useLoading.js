import {useState, useEffect, useCallback} from 'react'

export function useLoading(...arg) {
    const [repos_url] = arg
    const [list, setList] = useState([])
    const [page, setPage] = useState(2)

    useEffect(()=> {
        const option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
        }
        const url = new URL('https://api.github.com')
        url.href = repos_url
        url.search = new URLSearchParams({
            type: 'public', 
            sort: 'created', 
            direction: 'asc'
        })

        fetch(url, option)
        .then(res => {
            if (res.ok) return res.json()
            throw Error('ops')
        })
        .then(data => {
            console.log(data)
            setList(data)
        })
        .catch(error => console.error(error))
    },[repos_url])

    const scrolling = useCallback(() => {
        if (window.scrollY + window.innerHeight > 1.5 * window.innerHeight) {
            setPage(prevPage => prevPage + 1)
        }
    },[])

    useEffect(() => {
        window.addEventListener('scroll', scrolling)
        return () => window.removeEventListener('scroll', scrolling)
    },[page, scrolling])

    return [list.slice(0, page)]
}
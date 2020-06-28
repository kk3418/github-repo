import {useState, useEffect, useCallback} from 'react'

export function useLoading(...arg) {
    const [repos_url] = arg
    const [list, setList] = useState([])
    const [page, setPage] = useState(2)
    const [rowNow, setrowNow] = useState(0.5)

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
            setPage(2)
            setrowNow(0.5)
            if (res.ok) return res.json()
            throw Error('ops')
        })
        .then(data => {
            //console.log(data)
            setList(data)
        })
        .catch(error => console.error(error))
    },[repos_url])

    const scrolling = useCallback(() => {
        const h = window.innerHeight, y = window.scrollY
        const c = rowNow * h
        if (c - h < y && y < c){
            setPage(prevState => prevState + 1)
            setrowNow(prevState => prevState + 0.5)
        }
    },[rowNow])

    useEffect(() => {
        window.addEventListener('scroll', scrolling)
        return () => window.removeEventListener('scroll', scrolling)
    },[scrolling])

    return [list.slice(0, page)]
}
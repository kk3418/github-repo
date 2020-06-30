import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

export function useLoading(...arg) {
    const [repos_url] = arg
    const [list, setList] = useState([])
    const [page, setPage] = useState(2)
    const [rowNow, setrowNow] = useState(0.5)

    useEffect(()=> {
        if (repos_url === undefined) return () => null
        const option = {
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
            params: {
                type: 'public', 
                sort: 'created', 
                direction: 'asc'
            }
        }
        const url = repos_url

        axios.get(url, option)
        .then(res => {
            setPage(2)
            setrowNow(0.5)
            if (res.statusText === 'OK') return res
            throw Error('ops')
        })
        .then(res => {
            console.log(res.data)
            setList(res.data)
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
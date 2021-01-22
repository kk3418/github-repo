import React, {useEffect, useState} from 'react'
import {getData} from './get-data'

function Search({setResult}){
    const [user, setUser] = useState('')

    const url = `https://api.github.com/users/${user}`
    const option = {
        headers: {
            'content-type': 'application/json',
            'authorization': process.env.TOKEN
        },
    }
    const handleClick = () => {
        getData(url, option).then(res => {
            setResult({
                type: 'UPDATE',
                payload: {isFind: true, ...res.data}
            })
        }).catch(error => console.error(error))
        sessionStorage.setItem('result', user)
    }

    useEffect(() => {
        const storage = sessionStorage.getItem('result')
        if (storage) {
            getData(storage).then(res => {
                setResult({
                    type: 'UPDATE',
                    payload: {isFind: true, ...res.data}
                })
            }).catch(err => console.error(err))
        }
    }, [setResult])
    
    return (
        <div className="search-box">
            <label htmlFor="username">
                username : 
            </label>
            <input id="username" type="text" 
                placeholder="insert username" 
                onChange={e => setUser(e.target.value)}
                value={user}  
            />
            <button onClick={handleClick}
            type="button">Search</button>
        </div>
    )
}

export default Search
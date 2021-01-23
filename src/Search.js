import React, {useCallback, useEffect, useState} from 'react'
import {getData} from './get-data'

function Search({setResult}){
    const [user, setUser] = useState('')

    const getUserData = useCallback((input) => {
        const url = `https://api.github.com/users/${input}`
        const option = {
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
        }
        getData(url, option).then(res => {
            setResult({
                type: 'UPDATE',
                payload: res.data,
            })
        }).catch(error => console.error(error))
    }, [setResult])
    
    const handleClick = () => {
        getUserData(user)
        sessionStorage.setItem('result', user)
    }

    useEffect(() => {
        const storage = sessionStorage.getItem('result')
        if (storage) {
            getUserData(storage)
        }
    }, [getUserData])
    
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
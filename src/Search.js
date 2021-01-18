import React, {useEffect, useState} from 'react'
import {getData} from './get-data'

function Search({setResult}){
    const [user, setUser] = useState('')

    const handleClick = () => {
        getData(user).then(res => {
            setResult({
                type: 'UPDATE',
                payload: {isFind: true, ...res.data}
            })
        })
        localStorage.setItem('result', user)
    }

    useEffect(() => {
        const storage = localStorage.getItem('result')
        if (storage) {
            getData(storage).then(res => {
                setResult({
                    type: 'UPDATE',
                    payload: {isFind: true, ...res.data}
                })
            })
        }
    }, [])
    
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
import React, {useState} from 'react'
import {getData} from './get-data'

function Search({setResult}){
    const [user, setUser] = useState('')

   const handleClick = () => {
       getData(user).then(res => {
            setResult({isFind: true, ...res.data})
        })
   }
    
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
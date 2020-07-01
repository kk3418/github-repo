import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Search(props){
    const setResult = props.setResult
    const [user, setUser] = useState('c3h3')
    const [input, setInput] = useState('')

    useEffect(() => {
        const option = {
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
        }
        const url = `https://api.github.com/users/${user}`

        axios.get(url, option)
        .then(res => {
            console.log(res.data)
            return res
        })
        .then(res => {
            setResult({isFind: true, ...res.data})
        })
        .catch( error => console.error(error))
    },[user, setResult])
    
    return (
        <div className="search-box">
            <label htmlFor="username">username : </label>
            <input onChange={e => setInput(e.target.value)}
            value={input} type="text" placeholder="insert username" />
            <button onClick={() => setUser(input)}
            type="button">Search</button>
        </div>
    )
}

export default Search
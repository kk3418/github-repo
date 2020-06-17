import React, {useState, useEffect} from 'react'

function Search(props){
    const setResult = props.setResult
    const [user, setUser] = useState('kuanyui')
    const [input, setInput] = useState('')
    const url = `https://api.github.com/users/${user}`

    useEffect(() => {
        const option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'text/plain',
                'authorization': process.env.TOKEN
            },
        }
        fetch(url, option)
        .then(res => {
            if(res.ok) return res.json()
             throw new Error('We have some problems')
        })
        .then(data => {
            setResult({isFind: true, ...data})
            console.log(data)
        })
        .catch( error => console.error(error))
    },[url, setResult])
    
    return (
        <div>
            <label htmlFor="username">username : </label>
            <input onChange={e => setInput(e.target.value)}
            value={input} type="text" placeholder="insert username" />
            <button onClick={() => setUser(input)}
            type="button">Search</button>
        </div>
    )
}

export default Search
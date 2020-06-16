import React, {useState} from 'react'

function Search(){
    const [display, setDisplay] = useState('not found')
    const [user, setUser] = useState('c3h3')
    const [input, setInput] = useState('')
    const url = `https://api.github.com/users/${user}`

    fetch(url, { 
        headers: {
            'content-type': 'application/json',
        },
        mode: 'cors',
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        setDisplay(`${data.login} id is ${data.id}`)
    })
    .catch( error => console.error(error))
    
    return (
        <div>
            <label htmlFor="username">username : </label>
            <input onChange={e => setInput(e.target.value)}
            value={input} type="text" placeholder="insert username" />
            <button onClick={() => setUser('AmberSung1205')}
            type="button">Search</button>
            <p>{display}</p>
        </div>
    )
}

export default Search
import React, {useState, useEffect} from 'react'

function Search(props){
    const setResult = props.setResult
    const [user, setUser] = useState('c3h3')
    const [input, setInput] = useState('')
    const urlHref = `https://api.github.com/users/${user}`

    useEffect(() => {
        const option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
        }
        const url = new URL('https://api/github.com')
        url.href = urlHref

        fetch(url, option)
        .then(res => {
            if(res.ok) return res.json()
             throw new Error('We have some problems')
        })
        .then(data => {
            setResult({isFind: true, ...data})
            //console.log(data)
        })
        .catch( error => console.error(error))
    },[urlHref, setResult])
    
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
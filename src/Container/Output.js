import React, {useState, useEffect} from 'react'

function Output(props) {
    const {isFind,login, name, public_repos, repos_url} = props.result
    const [list, setList] = useState([])

    useEffect(()=> {
        const option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/vnd.github.mercy-preview+json',
                'authorization': process.env.TOKEN
            },
        }
        fetch(repos_url, option)
        .then(res => {
            if (res.ok) return res.json()
            throw Error("Can't find repos")
        })
        .then(data => {
            console.log(data)
            setList(data)
        })
        .catch(error => console.error(error))
    },[repos_url])

    const disp = list.map(i => <a key={i.id} href={i.clone_url}> clone repo </a>)

    return (
        <div>
            { isFind &&
            <>
                <div>
                    <h1>{name}</h1>
                    <h3>{login}</h3>
                    <h3>{public_repos}</h3>
                </div>
                <div>
                    {disp}
                </div>
            </>}   
        </div>
    )
}

export default Output
import React, {useState, useEffect} from 'react'
import Repo from './Repo'

function Output(props) {
    const {isFind,login, name, public_repos, repos_url, bio,
        avatar_url} = props.result
    const [list, setList] = useState([])
    const [page, setPage] = useState(2)

    useEffect(()=> {
        const option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'authorization': process.env.TOKEN
            },
        }
        const url = new URL('https://api.github.com')
        url.href = repos_url
        url.search = new URLSearchParams({
            type: 'public', 
            sort: 'created', 
            direction: 'asc'
        })

        fetch(url, option)
        .then(res => {
            if (res.ok) return res.json()
            throw Error('ops')
        })
        .then(data => {
            console.log(data)
            setList(data.slice(0, page))
        })
        .catch(error => console.error(error))
    },[repos_url, page])

    useEffect(() => {
        const Scrolling = () => {
            if (window.scrollTop >= window.innerHeight) {
                setPage(page + 1)
            }
            console.trace('listen scroll')
        }
        window.addEventListener('scroll', Scrolling())
    })

    const disp = list.map( item => (
        <Repo key={item.id} dispInfo={item} /> 
    ))

    disp.push(<h1 key={'loading'}>loading</h1>)

    return (
        <div>
            {isFind && <img className="avatar-size" src={avatar_url} alt="ops" />}
            <h1>{name}</h1>
            <h3>{login}</h3>
            <h3>{bio}</h3>
            <p>{isFind && `Total public repository : ${public_repos}`}</p>
           {isFind && disp}
        </div>
    )
}

export default Output
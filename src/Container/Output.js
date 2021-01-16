import React from 'react'
import Repo from './Repo'
import {useLoading} from '../useLoading'

function Output(props) {
    const {isFind,login, name, public_repos, repos_url, bio,
        avatar_url} = props.result
    const [list] = useLoading(repos_url)

    const disp = list.map(item => (
        <Repo key={item.id} dispInfo={item} />
    ))
    disp.push(<h1 key={'Done'}>No more repository</h1>)

    return (
        <div className="output">
            {isFind && <img className="avatar-size" src={avatar_url} alt="ops" />}
            <h1>{name}</h1>
            <h2>{login}</h2>
            <h2>{bio}</h2>
            <p>{isFind && `Total public repository : ${public_repos}`}</p>
           {isFind && disp}
        </div>
    )
}

export default Output
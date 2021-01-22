import React from 'react'
import {animateScroll as scroll} from 'react-scroll'
import Repo from './Repo'
import {useLoading} from './useLoading'

function Output(props) {
    const {isFind,login, name, public_repos, repos_url, bio,
        avatar_url, html_url} = props.result
    const [list] = useLoading({repos_url})

    const scrollToTop = () => scroll.scrollToTop({
        duration: 1200,
        smooth: 'easeInOutCubic',
      })

    return (
        <div className="output">
            {isFind && <img className="avatar-size" src={avatar_url} alt="ops" />}
            <h1>{name}</h1>
            <h2>{login}</h2>
            <h2>{bio}</h2>
            {isFind &&<a href={html_url}>go to his/her/its github</a>}
            <p>{isFind && `Total public repository : ${public_repos}`}</p>
            { list?.map(item => (
                <Repo key={item.id} dispInfo={item} />
            ))}
            <h1>No more repository</h1>
            <button className="scroll-to-top"
                onClick={scrollToTop}
            >
                go to top
            </button>
        </div>
    )
}

export default Output
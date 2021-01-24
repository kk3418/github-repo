import React, {useRef, FC} from 'react'
import {UserRepos} from './response-type'
import {animateScroll as scroll} from 'react-scroll'
import Repo from './Repo'
import {useLoading} from './useLoading'

const Output: FC<{result: UserRepos}> = ({result}) => {
    const {login, name, public_repos, repos_url, bio,
        avatar_url, html_url} = result
    const targetRef = useRef<HTMLHeadingElement>(null)
    const {list} = useLoading({repos_url, targetRef})

    const scrollToTop = () => scroll.scrollToTop({
        duration: 1200,
        smooth: 'easeInOutCubic',
    })

    return (
        <div className="output">
            {avatar_url && <img className="avatar-size" src={avatar_url} alt="ops" />}
            <h1>{name}</h1>
            <h2>{login}</h2>
            <h2>{bio}</h2>
            {html_url &&<a href={html_url}>go to his/her/its github</a>}
            <p>{public_repos && `Total public repository : ${public_repos}`}</p>
            <div className="repo-container">
                { list?.map(item => (
                    item && <Repo key={item.id} dispInfo={item} />
                ))}
            </div>
            <h1 ref={targetRef}>No more repository</h1>
            <button className="scroll-to-top" onClick={scrollToTop} >
                go to top
            </button>
        </div>
    )
}

export default Output
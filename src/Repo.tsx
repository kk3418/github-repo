import React, {FC} from 'react'
import {RepoData} from './response-type'

const Repo: FC<{dispInfo: RepoData}> = ({dispInfo}) => {
    const {
        name, clone_url, updated_at, 
        html_url, description
    } = dispInfo
    const copy = navigator.clipboard

    return (
        <div className="repo">
            <h3>{name}</h3>
            <p>{`Last update : ${updated_at}`}</p>
            {description && <div className="description">
                <p>About this repository :</p>
                <p>{description}</p>
            </div>}
            <input className="clone-btn"
            onClick={() => {
                copy.writeText(clone_url)
                .then(() => alert('copied!'))
            } }
            type="button" 
            defaultValue="clone this repository" />
            <br />
            <a href={html_url}>view on github</a>
        </div>
    )
}

export default Repo 
import React from 'react'

function Repo(props) {
    const {name, clone_url, updated_at, html_url, description
        } = props.dispInfo
    const copy = navigator.clipboard

    return (
        <div className="repo-container">
            <h3>{name}</h3>
            <p>{`last update : ${updated_at}`}</p>
            <p>about this project :</p>
            <p>{description}</p>
            <input onClick={() => {
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
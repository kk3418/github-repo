import axios from 'axios'

const option = {
    headers: {
        'content-type': 'application/json',
        'authorization': process.env.TOKEN
    },
}

export async function getData(user) {
    const url = `https://api.github.com/users/${user}`
    let response
    await axios.get(url, option)
    .then(res => {
        response = res
        console.log(res)
    })
    .catch( error => console.error(error))

    return Promise.resolve(response)
}
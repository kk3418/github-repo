import axios from 'axios'

export async function getData(url, option) {
    let response
    
    await axios.get(url, option)
    .then(res => {
        response = res
        console.log(res)
    })
    .catch( error => console.error(error))

    return Promise.resolve(response)
}
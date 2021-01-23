import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

export async function getData(url: string, option?: AxiosRequestConfig) {
    let response: undefined | AxiosResponse
    
    await axios.get(url, option)
    .then((res: AxiosResponse) => {
        response = res
        console.log(res)
    })
    .catch( error => console.error(error))

    return Promise.resolve(response)
}
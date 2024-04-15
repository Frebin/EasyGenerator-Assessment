import { commonUrlConfig } from './Http.config'

type RequestType = 'GET' | 'POST' | 'PUT'

export const _get = (url: string) => apiRequest(url, 'GET', null)
export const _post = (url: string, payload: any) => apiRequest(url, 'POST', payload)
export const _put = (url: string, payload: any) => apiRequest(url, 'PUT', payload)

const apiRequest = async (url: string, method: RequestType, payload: any) => {
    let response;
    if (method === "GET") {
        response = await commonUrlConfig.get(url)
    } else if (method === 'POST') {
        response = await commonUrlConfig.post(url, payload)
    } else if (method === 'PUT') {
        response = await commonUrlConfig.put(url, payload)
    }
    return response
}
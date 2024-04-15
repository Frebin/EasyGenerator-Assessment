import axios from 'axios'
import { getDomain } from './Domain.config'
import { setupInterceptors } from './Interceptors.config'
let domain = getDomain()

const commonHeaders = {
    "Content-type": 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
}

let commonUrlConfig: any;

const setUpBaseUrls = () => {
    commonUrlConfig = axios.create({
        baseURL: domain.common_url,
        headers: commonHeaders
    })

    setupInterceptors(commonUrlConfig)
}

setUpBaseUrls()

export { commonUrlConfig }
export const setDomainAfterLogin = () => {
    domain = getDomain()
    setUpBaseUrls()
}
import axios from "axios";

import Cookies from 'universal-cookie';

const cookie = new Cookies();

const $host = axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL
    }
)

const $authHost = axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL
    }
)

const authInterceptor = function (config: any) {
    config.headers.authorization = `Bearer ${cookie.get('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host, $authHost, cookie
}
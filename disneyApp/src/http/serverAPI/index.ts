import axios from "axios";
import {getData} from "../../storage";
import {TOKEN_STORAGE_NAME} from "./const";
import {API_URL} from "./routes";


const $host = axios.create(
    {
        baseURL: API_URL
    }
)

const $authHost = axios.create(
    {
        baseURL: API_URL
    }
)

const authInterceptor = async function (config: any) {
    config.headers.authorization = `Bearer ${await getData(TOKEN_STORAGE_NAME)}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host, $authHost
}
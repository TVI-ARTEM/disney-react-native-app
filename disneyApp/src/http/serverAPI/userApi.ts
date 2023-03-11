import {$authHost, $host} from "./index";
import {getData, storeData} from "../../storage";
import {TOKEN_STORAGE_NAME} from "./const";
import jwt_decode from 'jwt-decode';
import {API_USER_AUTH, API_USER_LOGIN, API_USER_LOGOUT, API_USER_REGISTRATION} from "./routes";

export const registration = async (email: string, password: string) => {
    console.log('registration')
    const {data} = await $host.post(API_USER_REGISTRATION as string, {
        email: email,
        password: password
    })
    await storeData(TOKEN_STORAGE_NAME, data.token)
    return jwt_decode(data.token)

}

export const login = async (email: string, password: string) => {
    console.log('login')
    const {data} = await $host.post(API_USER_LOGIN as string, {email: email, password: password})
    await storeData(TOKEN_STORAGE_NAME, data.token)
    return jwt_decode(data.token)

}

export const logout = async (email: string) => {
    console.log('logout')
    await $authHost.post(API_USER_LOGOUT as string, {email: email})
    await storeData(TOKEN_STORAGE_NAME, "")
}

export const check = async () => {
    console.log('check')
    const {data} = await $authHost.get(API_USER_AUTH as string)
    await storeData(TOKEN_STORAGE_NAME, data.token)
    return jwt_decode(data.token)
}



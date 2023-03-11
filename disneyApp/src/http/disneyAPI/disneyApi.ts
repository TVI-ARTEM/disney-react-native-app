import {BASE_URL_CHARACTERS, BASE_URL_FILTERED_CHARACTER, BASE_URL_SPECIFIC_CHARACTER} from "./routes";
import axios from 'axios';
import {Character} from "../../models/character";

export const getCharacters = async (page: number, pageSize: number) => {
    console.log('get-characters')
    const {data} = await axios.get(BASE_URL_CHARACTERS, {params: {page: page, pageSize: pageSize}})
    const characters = (data.data as []).map(it => it as Character)

    return {
        data: characters,
        count: data.count,
        totalPages: data.totalPages,
        previousPage: data.previousPage,
        nextPage: data.nextPage,
        json: JSON.stringify(data)
    }
}

export const getCharacter = async (id: number) => {
    console.log('get-characters')
    const {data} = await axios.get(BASE_URL_SPECIFIC_CHARACTER + id)
    return data as Character
}


export const getFilteredCharacter = async (name: string) => {
    console.log('get-characters')
    const paramName = name.replace(" ", "%20")
    const {data} = await axios.get(BASE_URL_FILTERED_CHARACTER, {params: {name: paramName}})
    const characters = (data.data as []).map(it => it as Character)

    return {
        data: characters,
        count: data.data.count
    }
}



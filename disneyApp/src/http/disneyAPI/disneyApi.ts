import {BASE_URL_CHARACTERS} from "./routes";
import axios from 'axios';

export const getCharacters = async (page: number, pageSize: number) => {
    console.log('login')
    const {data} = await axios.get(BASE_URL_CHARACTERS, {params: {page: page, pageSize: pageSize}})

    return {
        data: data.data,
        count: data.count,
        totalPages: data.totalPages,
        previousPage: data.previousPage,
        nextPage: data.nextPage,
        json: JSON.stringify(data)
    }
}


import {$authHost, $host} from "./index";

import {
    API_CHARACTER_COMMENT_COMMENTS,
    API_CHARACTER_COMMENT_CREATE, API_CHARACTER_GROUP_ADD_CHARACTER,
    API_CHARACTER_GROUP_ALL,
    API_CHARACTER_GROUP_CHARACTERS,
    API_CHARACTER_GROUP_CREATE,
} from "./routes";

import {Group} from "../../models/group";
import {GroupCharacter} from "../../models/groupCharacter";
import {Comment} from "../../models/comment";

export const createGroup = async (email: string, group: string) => {
    console.log('create-group')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_CREATE as string, {
        email: email,
        group: group
    })
    return {group: data.group as Group}
}

export const addGroupCharacter = async (email: string, group: string, id: number, name: string) => {
    console.log('add-group-character')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_ADD_CHARACTER as string, {
        email: email,
        group: group,
        id: id,
        name: name
    })
    return {group: data.group as GroupCharacter}
}

export const getGroups = async (email: string) => {
    console.log('get-groups')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_ALL as string, {params: {email: email}})
    return {groups: (data.groups as []).map(it => it as Group)}
}

export const getGroupCharacters = async (email: string, group: string) => {
    console.log('get-group-characters')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_CHARACTERS as string, {params: {email: email, group: group}})
    return {groups: (data.characters as []).map(it => it as GroupCharacter)}
}

export const createComment = async (email: string, comment: string, id: number) => {
    console.log('create-comment')
    const {data} = await $authHost.post(API_CHARACTER_COMMENT_CREATE as string, {
        email: email,
        comment: comment,
        id: id
    })
    return {group: data.comment as Comment}
}

export const getComments = async (email: string, id: number) => {
    console.log('get-comments')
    console.log(id)
    const {data} = await $authHost.get(API_CHARACTER_COMMENT_COMMENTS as string, {params: {email: email, id: id}})
    return {groups: (data.comments as []).map(it => it as Comment)}
}




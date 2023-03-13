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
import {User} from "../../models/user";

export const createGroup = async (user: User, group: string) => {
    console.log('create-group')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_CREATE as string, {
        email: user.email,
        group: group
    })
    return {group: data.group as Group}
}

export const addGroupCharacter = async (user: User, group: Group, id: number, name: string) => {
    console.log('add-group-character')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_ADD_CHARACTER as string, {
        email: user.email,
        group: group.name,
        id: id,
        name: name
    })
    return {group: data.group as GroupCharacter}
}

export const getGroups = async (user: User) => {
    console.log('get-groups')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_ALL as string, {params: {email: user.email}})
    return {groups: (data.groups as []).map(it => it as Group)}
}

export const getGroupCharacters = async (user: User, group: Group) => {
    console.log('get-group-characters')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_CHARACTERS as string, {
        params: {
            email: user.email,
            group: group.name
        }
    })
    return {groups: (data.characters as []).map(it => it as GroupCharacter)}
}

export const createComment = async (user: User, comment: string, id: number) => {
    console.log('create-comment')
    const {data} = await $authHost.post(API_CHARACTER_COMMENT_CREATE as string, {
        email: user.email,
        comment: comment,
        id: id
    })
    return {group: data.comment as Comment}
}

export const getComments = async (user: User, id: number) => {
    console.log('get-comments')
    console.log(id)
    const {data} = await $authHost.get(API_CHARACTER_COMMENT_COMMENTS as string, {params: {email: user.email, id: id}})
    return {groups: (data.comments as []).map(it => it as Comment)}
}




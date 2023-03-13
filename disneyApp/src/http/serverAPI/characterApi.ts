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
import {getData, storeData} from "../../storage";
import {COMMENTS_STORAGE_NAME, GROUPS_CHARACTER_STORAGE_NAME, GROUPS_STORAGE_NAME} from "./const";

export const createGroup = async (user: User, group: string) => {
    console.log('create-group')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_CREATE as string, {
            email: user.email,
            group: group
        },
        {timeout: 1000})
        .catch(() => {
            alert("No connection")
            return {data: null}
        })

    if (data !== null) {
        const groupsStorage = await getData(GROUPS_STORAGE_NAME) as string
        const groups = groupsStorage !== "" ? (JSON.parse(groupsStorage) as []).map(it => it as Group) : [] as Group[]
        groups.push(data.group)
        await storeData(GROUPS_STORAGE_NAME, JSON.stringify(groups))
    }

    return {group: data.group as Group}
}

export const addGroupCharacter = async (user: User, group: Group, id: number, name: string) => {
    console.log('add-group-character')
    const {data} = await $authHost.post(API_CHARACTER_GROUP_ADD_CHARACTER as string, {
            email: user.email,
            group: group.name,
            id: id,
            name: name
        },
        {timeout: 1000})
        .catch(() => {
            alert("No connection")
            return {data: null}
        })

    if (data !== null) {
        const charactersStorage = await getData(GROUPS_CHARACTER_STORAGE_NAME) as string
        const characters = charactersStorage !== "" ? (JSON.parse(charactersStorage) as [])
            .map(it => it as GroupCharacter) : [] as GroupCharacter[]
        characters.push(data.group)
        await storeData(GROUPS_CHARACTER_STORAGE_NAME, JSON.stringify(characters))
    }
    return {group: data.group as GroupCharacter}
}

export const getGroups = async (user: User) => {
    console.log('get-groups')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_ALL as string, {
            params: {email: user.email},
            timeout: 2500
        }
    )
        .catch(async () => {
            const groupsStorage = await getData(GROUPS_STORAGE_NAME) as string
            const groups = groupsStorage !== "" ? (JSON.parse(groupsStorage) as []).map(it => it as Group) : [] as Group[]

            const res = groups.filter(it => it.userId === user.id)
            return {data: {groups: res, isLocal: true}}
        })

    if (data.isLocal === undefined) {
        const groupsStorage = await getData(GROUPS_STORAGE_NAME) as string
        const groups = groupsStorage !== "" ? (JSON.parse(groupsStorage) as []).map(it => it as Group) : [] as Group[]

        const res = groups.filter(it => it.userId !== user.id)

        await storeData(GROUPS_STORAGE_NAME, JSON.stringify([...res, ...data.groups]))
    }

    return {groups: (data.groups as []).map(it => it as Group)}
}

export const getGroupCharacters = async (user: User, group: Group) => {
    console.log('get-group-characters')
    const {data} = await $authHost.get(API_CHARACTER_GROUP_CHARACTERS as string, {
            params: {
                email: user.email,
                group: group.name
            },
            timeout: 2500
        }
    )
        .catch(async () => {
            const charactersStorage = await getData(GROUPS_CHARACTER_STORAGE_NAME) as string
            const characters = charactersStorage !== "" ? (JSON.parse(charactersStorage) as [])
                .map(it => it as GroupCharacter) : [] as GroupCharacter[]

            const res = characters.filter(it => it.groupId === group.id)
            return {data: {characters: res, isLocal: true}}
        })

    if (data.isLocal === undefined) {
        const charactersStorage = await getData(GROUPS_CHARACTER_STORAGE_NAME) as string
        const characters = charactersStorage !== "" ? (JSON.parse(charactersStorage) as [])
            .map(it => it as GroupCharacter) : [] as GroupCharacter[]

        const res = characters.filter(it => it.groupId !== group.id)

        await storeData(GROUPS_CHARACTER_STORAGE_NAME, JSON.stringify([...res, ...data.characters]))

    }
    return {groups: (data.characters as []).map(it => it as GroupCharacter)}
}

export const createComment = async (user: User, comment: string, id: number) => {
    console.log('create-comment')
    const {data} = await $authHost.post(API_CHARACTER_COMMENT_CREATE as string, {
            email: user.email,
            comment: comment,
            id: id
        },
        {timeout: 1000})
        .catch(() => {
            alert("No connection")
            return {data: null}
        })


    if (data !== null) {
        const commentsStorage = await getData(COMMENTS_STORAGE_NAME) as string
        const comments = commentsStorage !== "" ? (JSON.parse(commentsStorage) as []).map(it => it as Comment) : [] as Comment[]
        comments.push(data.comment)
        await storeData(COMMENTS_STORAGE_NAME, JSON.stringify(comments))
    }


    return {group: data.comment as Comment}
}

export const getComments = async (user: User, id: number) => {
    console.log('get-comments')
    const {data} = await $authHost.get(API_CHARACTER_COMMENT_COMMENTS as string, {
            params: {email: user.email, id: id},
            timeout: 2500
        }
    )
        .catch(async () => {
            const commentsStorage = await getData(COMMENTS_STORAGE_NAME) as string
            const comments = commentsStorage !== "" ? (JSON.parse(commentsStorage) as []).map(it => it as Comment) : [] as Comment[]

            const res = comments.filter(it => it.userId === user.id && it.characterId === id)
            return {data: {comments: res, isLocal: true}}
        })

    if (data.isLocal === undefined) {
        const commentsStorage = await getData(COMMENTS_STORAGE_NAME) as string
        const comments = commentsStorage !== "" ? (JSON.parse(commentsStorage) as []).map(it => it as Comment) : [] as Comment[]
        const res = comments.filter(it => it.userId !== user.id && it.characterId !== id)
        await storeData(COMMENTS_STORAGE_NAME, JSON.stringify([...res, ...data.comments]))
    }

    return {groups: (data.comments as []).map(it => it as Comment)}
}




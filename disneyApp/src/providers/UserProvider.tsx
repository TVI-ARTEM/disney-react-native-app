import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import {User} from "../models/user";

type UserContextProviderProps = {
    children: React.ReactNode
}

interface UserContextType {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<User>({} as User)

    const value = {
        user,
        setUser,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


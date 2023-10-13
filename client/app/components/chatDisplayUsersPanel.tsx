"use client"

import { v4 as uuidv4 } from 'uuid';
import Image from "next/image"

import { User } from "@/interfaces"
import { SetStateAction, Dispatch } from "react"

interface Props {
    users: null | User[]
    setHighlightedUser: Dispatch<SetStateAction<string>>
}

export default function ChatDisplayUsersPanel({users, setHighlightedUser}: Props){

    function handleHighlightUser(name: string){
        setHighlightedUser(name)
    }

    const userList = users?.map(user => {
        return (
            <div key={uuidv4()} onClick={() => {handleHighlightUser(user.name)}} className="flex items-center gap-4 p-2 cursor-pointer">
                <Image className="border-2 border-black" src={user.image} alt="user" height={100} width={50} />
                <h4>{user.name}</h4>
            </div>
        )
    })

    return (
        <div>
            {userList}
        </div>
    )
}

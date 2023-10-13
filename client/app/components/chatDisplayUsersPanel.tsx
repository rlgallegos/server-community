"use client"

import Image from "next/image"

import { User } from "@/interfaces"

interface Props {
    users: null | User[]
}

export default function ChatDisplayUsersPanel({users}: Props){

    const userList = users?.map(user => {
        return <div className="flex items-center gap-4 p-2">
            <Image className="border-2 border-black" src={user.image} alt="user" height={100} width={50} />
            <h4>{user.name}</h4>
        </div>
    })

    return (
        <div>
            {userList}
        </div>
    )
}

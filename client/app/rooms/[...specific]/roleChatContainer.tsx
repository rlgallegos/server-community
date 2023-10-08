'use client'

import RoleChatDisplay from "./roleChatDisplay"
import RoleChatInput from "./roleChatInput"

import { useState } from "react"

interface Props{
    roomMessages: Array<string>
}

export default function RoleChatContainer({roomMessages}: Props){
    const [messages, setMessages] = useState(roomMessages)
    

    return (
        <div className="min-h-screen bg-purple-300 flex flex-col text-black items-center justify-center">
            <div className="flex flex-col gap-5">
                <RoleChatDisplay messages={messages} />
                <RoleChatInput setMessages={setMessages} />
            </div>

        </div>
    )
}
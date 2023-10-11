'use client'

import RoleChatDisplay from "./roleChatDisplay"
import RoleChatInput from "./roleChatInput"

import { useState } from "react"

import { Message } from "@/interfaces"

interface Props{
    roomMessages: Array<Message>
}

export default function RoleChatContainer({roomMessages}: Props){
    const [messages, setMessages] = useState<Array<Message>>(roomMessages)
    
    return (
        <div className="min-h-screen bg-purple-300 flex flex-col text-black items-center justify-center ">
            <div className="flex flex-col gap-5 w-full h-1/2">
                <RoleChatDisplay messages={messages} />
                <RoleChatInput setMessages={setMessages} />
            </div>
        </div>
    )
}
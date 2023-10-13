'use client'

import ChatDisplay from "./chatDisplay"
import ChatInput from "./chatInput"

import { useState } from "react"

import { Message } from "@/interfaces"

interface Props{
    roomMessages: Array<Message>
}

export default function ChatContainer({roomMessages}: Props){
    const [messages, setMessages] = useState<Array<Message>>(roomMessages)

    return (
        <div className="h-screen bg-purple-300 flex flex-col text-black items-center justify-center ">
            <div className="flex flex-col gap-5 w-full h-3/4 bg-blue-200">
                <ChatDisplay messages={messages} />
                <ChatInput setMessages={setMessages} />
            </div>
        </div>
    )
}
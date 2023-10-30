'use client'

import ChatDisplay from "./chatDisplay"
import ChatInput from "./chatInput"

import { useState } from "react"

import { Message } from "@/interfaces"

interface Props{
    roomMessages: Array<Message>
    type: string
}

export default function ChatContainer({roomMessages, type}: Props){
    const [messages, setMessages] = useState<Array<Message>>(roomMessages)

    return (
        <div className="h-screen bg-primary flex flex-col ">
            <div className="h-1/6 flex flex-col items-center justify-center">
                <h1 className="text-xl">{type == 'specific' ? 'Job-Specific Room' : 'General Restaurant Room'}</h1>
            </div>
            <div className="flex flex-col gap-5 w-full h-5/6 bg-secondary">
                <ChatDisplay messages={messages} />
                <ChatInput setMessages={setMessages} />
            </div>
        </div>
    )
}
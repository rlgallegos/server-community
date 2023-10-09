'use client'
import { v4 as uuidv4 } from 'uuid';

import { Message } from '@/interfaces';

interface Props{
    messages: Array<Message>
}

export default function RoleChatDisplay({messages}: Props){
    const messageList = messages.map(message => {
        console.log(message)
        return <li key={uuidv4()}>{message.timeStamp}{message.user}: {message.text}</li>
    })
    return (
        <div className="border-4 border-black w-1/2 mx-auto text-center h-full">
            <h1>Role Chat Display</h1>
            <ul>
                {messageList}
            </ul>
        </div>
    )
}
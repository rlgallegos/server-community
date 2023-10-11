'use client'
import { v4 as uuidv4 } from 'uuid';

import { Message } from '@/interfaces';
import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';

interface Props{
    messages: Array<Message>
}

export default function RoleChatDisplay({messages}: Props){

    const userTailwind = "text-blue-700 text-left"
    const otherUserTailwind = "text-slate-700 text-right"

    const {data:session} = useSession()

    const messageList: ReactElement[] = messages.map((message) => {
        if (session?.user?.name === message.user) {
            // users messages
            return (
                <li key={uuidv4()} className={userTailwind}>
                [{message.timeStamp}] {message.user}: {message.text}
                </li>
            );
            } else {
            // other messages
            return (
                <li key={uuidv4()} className={otherUserTailwind}>
                [{message.text}] :{message.user} [{message.timeStamp}]
                </li>
            );
            }
      });


    return (
        <div className="flex flex-col items-center border-4 border-black w-3/4 mx-auto text-center h-full">
            <h1>Role Chat Display</h1>
            <ul className='w-full'>
                {session?.user?.name && messageList}
            </ul>
        </div>
    )
}
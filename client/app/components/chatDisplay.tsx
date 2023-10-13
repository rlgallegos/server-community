'use client'
import { v4 as uuidv4 } from 'uuid';

import { Message, User } from '@/interfaces';
import { useSession } from 'next-auth/react';
import { MouseEvent, ReactElement, useState } from 'react';

interface Props{
    messages: Array<Message>
}

export default function ChatDisplay({messages}: Props){
    const [users, setUsers] = useState<null | User[]>(null)
    const {data:session} = useSession()

    const userTailwind = "text-blue-700 text-left"
    const otherUserTailwind = "text-slate-700 text-right"

    function handleShowCoworkers(e: MouseEvent){
        console.log(e)
    }



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
                {message.text} :{message.user} [{message.timeStamp}]
                </li>
            );
            }
      });

    return (
        <div className="w-full flex flex-col items-center border-4 mx-auto text-center h-3/4">
            <h1>Role Chat Display</h1>

            <div className='w-3/4 flex'>
                <div className='w-full p-4 border-4 border-black'>
                    <ul className=''>
                        {session?.user?.name && messageList}
                    </ul>
                </div>
                {!users && <button onClick={handleShowCoworkers} className='bg-white text-black'>Click Me</button>}
            </div>

        </div>
    )
}
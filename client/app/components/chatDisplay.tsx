'use client'
import { v4 as uuidv4 } from 'uuid';

import { useSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Message, User } from '@/interfaces';
import ChatDisplayUsersPanel from './chatDisplayUsersPanel';

interface Props{
    messages: Array<Message>
}

export default function ChatDisplay({messages}: Props){
    const [users, setUsers] = useState<null | User[]>(null)
    const [error, setError] = useState<string>('')
    const {data:session} = useSession()
    const pathname = usePathname()

    const userTailwind = "text-blue-700 text-left"
    const otherUserTailwind = "text-slate-700 text-right"

    async function handleShowCoworkers(){
        const regex: RegExp = /\/rooms\/(\d+)(?:\/([^/]+))?/
        const match: RegExpMatchArray | null = pathname.match(regex)
        
        let restID: string = ''
        let role: string = ''
        if (match) {
          restID = match[1]
          role = match[2]
        }
        let url: string = ''
        if (role){
            url = `${process.env.NEXT_PUBLIC_REACT_APP_API}/users/${restID}/${role}`
        } else {
            url = `${process.env.NEXT_PUBLIC_REACT_APP_API}/users/${restID}`
        }
        const res = await fetch(url)
        if (res.ok){
            res.json().then(data => setUsers(data))
        } else {
            res.json().then(e => setError(e.error))
        }
    }
    console.log(users)
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

            <div className='w-full flex'>
                <div className='w-3/4 p-4 border-2 border-black'>
                    <ul className=''>
                        {session?.user?.name && messageList}
                    </ul>
                </div>
                <div className='w-1/4 flex flex-col'>

                    <div className='bg-slate-300 w-full h-full border-2 border-black'>
                        {users && <ChatDisplayUsersPanel users={users} />}
                    </div>

                    {!users && <button onClick={handleShowCoworkers} className='bg-white text-black'>Click Me</button>}
                    {error && <p className='text-red-700'>{error}</p>}
                </div>
            </div>

        </div>
    )
}
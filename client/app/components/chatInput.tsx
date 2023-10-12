'use client'

import { usePathname } from "next/navigation"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"

import { Message } from "@/interfaces"
import { useSession } from "next-auth/react"


interface Props{
    setMessages: Dispatch<SetStateAction<Array<Message>>>
}

export default function ChatInput({setMessages}: Props){
    const pathname = usePathname()
    const {data:session} = useSession()
    const [error, setError] = useState<string>('')
    const [newMessage, setNewMessage] = useState<Message>({
        user: '',
        text: '',
        timeStamp: 0
    })

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
        const time: number = Math.floor(Date.now() / 1000)
        let username: string = ''
        if (session?.user?.name){
            username = session.user.name
        }
        setNewMessage({
            user: username,
            text: e.target.value,
            timeStamp: time
        })
    }

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
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
            url = `${process.env.NEXT_PUBLIC_REACT_APP_API}/messages/${restID}/${role}`
        } else {
            url = `${process.env.NEXT_PUBLIC_REACT_APP_API}/messages/${restID}`
        }

        const res = await fetch(url, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
        if (res.ok){
            const data: Message = await res.json()
            setMessages(messages => [...messages, data])

        } else {
            const e = await res.json()
            setError(e.error)
        }
        setNewMessage({user: '', timeStamp: 0, text: ''})
    }

    return (
        <div className="mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea className="p-3" name="" id="" cols={100} rows={4} value={newMessage.text} onChange={handleChange}></textarea>
                <button className="border border-black w-48" type="submit">Post</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
'use client'

import { Dispatch, SetStateAction } from "react"


interface Props{
    setMessages: Dispatch<SetStateAction<Array<string>>>
}


export default function RoleChatInput({setMessages}: Props){
    return (
        <div>Input for Role chat</div>
    )
}
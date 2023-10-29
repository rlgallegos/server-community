'use client'

import { useState, MouseEvent } from "react"

interface Props{
    email: string
}

export default function InfoContainer({email}: Props){
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isPromiseFulfilled, setIsPromiseFulfilled] = useState<boolean>(true)

    async function handleGetSuggestions(e: MouseEvent){
        setIsPromiseFulfilled(false)
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/suggestion/${email}`)
        const data = await res.json()
        setIsPromiseFulfilled(true)
        const suggestionArray = data.response.split('\n\n')
        setSuggestions(suggestionArray)
    }

    return (
        <div>
            {/* Response */}
            <ul className="flex flex-col gap-4">
                {suggestions.map((suggestion, index) => {
                    return <li key={index}>{suggestion}</li>
                })}
            </ul>
            <button className="px-4 py-2 border border-black bg-white"
            disabled={!isPromiseFulfilled} onClick={handleGetSuggestions} >Get Summary</button>
        </div>
    )
}
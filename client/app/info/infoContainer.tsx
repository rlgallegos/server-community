'use client'

import { useState, MouseEvent } from "react"

interface Props{
    email: string
}

export default function InfoContainer({email}: Props){
    const [suggestions, setSuggestions] = useState<string[]>([])

    async function handleGetSuggestions(e: MouseEvent){
        console.log(email)
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/suggestion/${email}`)
        const data = await res.json()
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
            <button onClick={handleGetSuggestions} >Get Suggestion</button>
        </div>
    )
}
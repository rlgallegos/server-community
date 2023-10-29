'use client'

import { useState, MouseEvent } from "react"

interface Props{
    email: string
}

export default function InfoContainer({email}: Props){
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isPromiseFulfilled, setIsPromiseFulfilled] = useState<boolean>(true)
    const [isReportShowing, setIsReportShowing] = useState<boolean>(false)

    async function handleGetSuggestions(e: MouseEvent){
        setIsPromiseFulfilled(false)
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/suggestion/${email}`)
        const data = await res.json()
        setIsPromiseFulfilled(true)
        setIsReportShowing(true)
        const suggestionArray = data.response.split('\n\n')
        setSuggestions(suggestionArray)
    }

    return (
        <div className="min-h-screen bg-primary flex justify-evenly">

            {/* Explanation / Button */}
            <div className={`p-6 flex flex-col border border-black justify-evenly items-center transition-all ease-in-out duration-1000
            ${isReportShowing ? 'w-1/4' : 'w-full'}`}>
                
                <h1 className="text-xl">Here you can get an individualized report on your specific earnings / shifts:</h1>

                <button className="px-4 py-2 border border-black bg-accent"
                disabled={!isPromiseFulfilled} onClick={handleGetSuggestions} >Get Summary</button>
                <p>Powered By OpenAI</p>
            </div>

            {/* Response */}
            <ul className={`p-6 flex flex-col gap-2 transition-all duration-1000
            ${isReportShowing ? 'w-3/4' : 'w-0 hidden'}`}>
                {suggestions.map((suggestion, index) => {
                    return <li key={index} className="">{suggestion}</li>
                })}
            </ul>
        </div>
    )
}
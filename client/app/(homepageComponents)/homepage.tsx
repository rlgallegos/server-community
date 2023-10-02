'use client'

import { useState } from "react"
import HomeLoggedIn from "./homepageLoggedIn"
import HomeLoggedOut from "./homepageLoggedOut"

export default function Homepage(){
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)


    return (
        <div className="w-full bg-blue-400">
            {
                isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
            
        </div>
    )
}
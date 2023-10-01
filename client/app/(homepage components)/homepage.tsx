'use client'

import { useState } from "react"
import HomeLoggedIn from "./homePageLoggedIn"
import HomeLoggedOut from "./homepageLoggedOut"

export default function HomePage(){
    const [isLoggedIn, setisLoggedIn] = useState<Boolean>(false)

    function handleLogin(){
        setisLoggedIn(!isLoggedIn)
    }

    return (
        <div className="w-full bg-blue-400">
            {
                isLoggedIn ? <HomeLoggedIn /> : <HomeLoggedOut />
            }
            <button onClick={handleLogin}>Log In</button>
        </div>
    )
}
'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import HomeLoggedIn from "./homepageLoggedIn"
import HomeLoggedOut from "./homepageLoggedOut"

import { User } from "@/interfaces"


const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API


export default function Homepage(){
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {data:session} = useSession()


    useEffect(() => {
        if (session && session.user){
            fetch(`${API_URL}/user/${session.user.email}`).then(res => {
                if (res.ok){
                    res.json().then( data => {
                        setUserData(data)
                    })
                } else {
                    console.log(res)
                }
            })
        }
        setIsLoading(false)
    }, [session])


    if (isLoading) {
        return <div>Loading User Information...</div>;
    } else if (session && session.user) {
        return <HomeLoggedIn userData={userData} />;
    } else {
        return <HomeLoggedOut />;
    }
}
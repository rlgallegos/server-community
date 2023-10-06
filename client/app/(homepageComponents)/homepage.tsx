'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import HomeLoggedIn from "./homepageLoggedIn"
import HomeLoggedOut from "./homepageLoggedOut"

import { User } from "@/interfaces"

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API


export default function Homepage(){
    const [userData, setUserData] = useState<User | null>(null)
    const {data:session} = useSession()


    if (session && session.user){

        fetch(`${API_URL}/user/${session.user.email}`).then(res => {
            if (res.ok){
                res.json().then( data => {
                    setUserData(data)
                })
            }
        })

        return (
            <HomeLoggedIn userData={userData} />
        )
    } else {
        return (
            <HomeLoggedOut />
        )
    }
}
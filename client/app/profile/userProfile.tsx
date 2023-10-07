'use client'

import { User } from "@/interfaces"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


export default function userProfile({userData}: {userData: User | null}){
    const {data:session} = useSession()
    // if (!session || !session.user){
    //     redirect('/')
    // }

    return <div>
        Client profile
    </div>
}
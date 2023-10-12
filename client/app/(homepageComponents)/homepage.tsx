'use client'

import HomeLoggedIn from "./homepageLoggedIn"
import HomeLoggedOut from "./homepageLoggedOut"

import { User } from "@/interfaces"

export default function Homepage({user}: {user: User | null}){
    if (user){
        return <HomeLoggedIn userData={user} />;
    } else {
        return <HomeLoggedOut />;
    }
}
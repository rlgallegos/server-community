"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton(){
    const {data: session} = useSession()

    if (session && session.user){
        return (
            <div>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    } else {
        return (
            <div className="w-24 h-8 rounded-md bg-white flex items-center justify-center border border-black">
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        )
    }

}
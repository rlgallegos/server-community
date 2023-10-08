"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

export default function SignInButton(){
    const {data: session} = useSession()

    // // Checking if already in database / adding if necessary
    // useEffect(() => {
    //     if (session && session.user){
    //         fetch(`${API_URL}/oauth/update`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(session.user)
    //         }).then(res => {
    //             if (res.ok){
    //                 res.json()
    //                 .then(data => console.log(data))
    //             } else {
    //                 res.json()
    //                 .then(data => console.log(data))
    //             }
    //         })
    //     }
    // }, [session])



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
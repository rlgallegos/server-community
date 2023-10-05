import { redirect } from "next/navigation"

import UserInfo from "./userInfo"



const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

const getToken = async (authorizationCode: string) => {
    const res = await fetch(`${API_URL}/oauth/token-exchange`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorizationCode)
    })
    if (!res.ok) return undefined
    return res.json()
}



export default async function Callback({searchParams}: any){
    const userData = await getToken(searchParams.code)
    if (!userData){
        redirect('/')
    }
    // userData.isAuthenticated = false
    console.log('user data:', userData)


    return (
        <div className="bg-green-200 min-h-screen w-full text-black flex items-center">
            <UserInfo userData={userData} />
        </div>
    )
}
import { getServerSession } from "next-auth"

import UserProfile from "./userProfile"
import { redirect } from "next/navigation"

export default async function Profile(){
    const session = await getServerSession()
    
    const restaurantResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/restaurants`)
    const restaurantData = await restaurantResponse.json()


    if (session && session.user){
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${session.user.email}`)
        if (userResponse.ok){
            const userData = await userResponse.json()
            return <UserProfile user={userData} restaurantData={restaurantData} />
        } else {
            return redirect('/')
        }
    }
}
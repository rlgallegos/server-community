import { getServerSession } from "next-auth"

import UserProfile from "./userProfile"

export default async function Profile(){
    const session = await getServerSession()
    
    const restaurantResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/restaurants`)
    const restaurantData = await restaurantResponse.json()


    if (session && session.user){
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${session.user.email}`)
        if (userResponse.ok){
            const userData = await userResponse.json()
            return <div className="min-h-screen bg-green-300 flex flex-col text-black items-center justify-center ">
                <h1 className="mx-auto text-3xl">Profile Page</h1>
                <UserProfile userData={userData} restaurantData={restaurantData} />
            </div>
        } else {
            <div>Error</div>
        }

    }
}
import { getServerSession } from "next-auth"
import userProfile from "./userProfile"
import { handler } from "../api/auth/[...nextauth]/route"



export default async function Profile(){
    // const session = await getServerSession(handler)
    
    // if (session && session.user){
    //     console.log('session variable in Profile server component:', session.user)
    // }


    return <div className="min-h-screen bg-green-300 flex flex-col text-black">
        <h1>Profile Page</h1>

    </div>
}
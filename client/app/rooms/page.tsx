import Link from "next/link"

import { getServerSession } from "next-auth"




export default async function Rooms(){
    const session = await getServerSession()

    if (session && session.user){
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${session.user.email}`)
        if (userResponse.ok){
            const userData = await userResponse.json()
            return <div className="min-h-screen bg-green-300 flex flex-col text-black items-center justify-center ">
                <h1 className="mx-auto text-3xl">Rooms Page</h1>
                <div>
                    <Link href='/rooms/general'>General Room</Link>
                    <Link href={`/rooms/${userData.role.toLowerCase()}`}>{userData.role}s</Link>
                </div>
            </div>
        } else {
            <div>Error</div>
        }
    }
}
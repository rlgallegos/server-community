import Link from "next/link"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Rooms(){
    const session = await getServerSession()

    if (session?.user){
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${session.user.email}`)
        if (userResponse.ok){
            const userData = await userResponse.json()
            return (
                <div className="min-h-screen bg-primary py-6 flex flex-col justify-center">

                    <div className="mx-auto flex flex-col w-1/2 h-[400px] border bg-secondary border-accent space-y-4 p-16 items-center justify-evenly">
                        <h1 className="text-3xl text-center">Rooms</h1>

                        <div className="flex justify-evenly w-full">
                            <Link className="bg-accent border border-white px-4 py-2" href={`/rooms/${userData.restaurant_id}`}>General Room</Link>
                            <Link className="bg-accent border border-white px-4 py-2" href={`/rooms/${userData.restaurant_id}/${userData.role.toLowerCase()}`}>{userData.role} Room</Link>
                        </div>

                    </div>

                </div>
            )
        } else {
            return redirect('/')
        }
    }
}
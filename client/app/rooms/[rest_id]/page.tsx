import ChatContainer from "@/app/components/chatContainer"
import { Message } from "@/interfaces"
import { redirect } from "next/navigation"

interface Params{
    rest_id: string
}
interface Props{
    params: Params
}


export default async function GeneralChatRoom({params}: Props){
    const restaurantID = params.rest_id
    const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/messages/${restaurantID}`, {
        cache: 'no-store'
    })
    if (res.ok){
        const data = await res.json()
        return <ChatContainer roomMessages={data} />
    } else {
        redirect('/rooms')
    }

    return (
        <div className="min-h-screen bg-pink-300 flex flex-col text-black items-center justify-center ">General Chat Room</div>
    )
}
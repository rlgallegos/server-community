import { redirect } from "next/navigation"
import ChatContainer from "@/app/components/chatContainer"


interface Params{
    specific: string[]
}
interface Props{
    params: Params
}

export default async function RoleChatRoom({params}: Props){
    const [restaurantID, role] = params.specific

    const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/messages/${restaurantID}/${role}`, {
        cache: 'no-store'
    })
    if (res.ok){
        const data = await res.json()
        return <ChatContainer roomMessages={data} />
    } else {
        redirect('/rooms')
    }

}
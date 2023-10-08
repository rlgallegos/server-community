import { redirect } from "next/navigation"
import RoleChatContainer from "./roleChatContainer"

interface Params{
    specific: Array<string>
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
        return <RoleChatContainer roomMessages={data} />
    } else {
        redirect('/rooms')
    }

}
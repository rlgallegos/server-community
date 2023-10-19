
import { getServerSession } from "next-auth"

import { FetchTipsAndStats } from "../services/fetches"
import { Tip, TipStatistic } from "@/interfaces"

interface Data {
    tips: Tip[],
    statistics: TipStatistic[]
}

export default async function Tips(){
    const session = await getServerSession()

    let data: null | Data = null
    if (session?.user?.email) {
        data = await FetchTipsAndStats(session.user.email)
        console.log(data)
    }

    return (
        <div>The Tip Page</div>
    )
}
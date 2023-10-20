
import { getServerSession } from "next-auth"

import { fetchTipsAndStats } from "../services/fetches"
import { Tip, TipStatistic } from "@/interfaces"

import CalendarContainer from "./calendarContainer"

interface Data {
    tips: Tip[],
    statistics: TipStatistic[]
}

export default async function Tips(){
    const session = await getServerSession()

    let data: null | Data = null
    if (session?.user?.email) {
        data = await fetchTipsAndStats(session.user.email)
        console.log(data)
    }

    return (
        <div className="min-h-screen flex flex-col bg-yellow-100 justify-center">
            <CalendarContainer />
        </div>
    )
}
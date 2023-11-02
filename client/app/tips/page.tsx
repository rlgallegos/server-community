
import { getServerSession } from "next-auth"

import { fetchTipsAndStats } from "../services/fetches"
import { Tip, TipStatistic } from "@/interfaces"

import TipsContainer from "./TipsContainer"

interface Data {
    tips: Tip[],
    statistics: TipStatistic[]
}

export default async function Tips(){
    const session = await getServerSession()

    let data: null | Data = null
    if (session?.user?.email) {
        data = await fetchTipsAndStats(session.user.email)
    }
    if (data){
        return <TipsContainer tipInfo={data.tips} statisticInfo={data.statistics} />
    }
}
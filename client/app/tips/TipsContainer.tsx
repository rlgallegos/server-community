'use client'

import { Tip, TipStatistic } from "@/interfaces"

import CalendarContainer from "./calendarContainer"
import EditTipForm from "./editTipForm"
import { useState } from "react"


interface Props{
    tipInfo: Tip[]
    statisticInfo: TipStatistic[]
}

export default function TipsContainer({tipInfo, statisticInfo}: Props){
    const [tip, setTip] = useState<undefined | null | Tip>(null)
    const [tips, setTips] = useState<Tip[]>(tipInfo)
    const [statistics, setStatistics] = useState<TipStatistic[]>(statisticInfo)

    const handleUpdateTips = (id: number, newAmt: number) => {
        console.log(id, newAmt)
        const updatedTips = tips.map(tip => {
            if (tip.id == id){
                tip.tip_amount = newAmt
            }
            return tip
        })
        console.log(updatedTips)
        setTips(updatedTips)

    }

    return (
        <div className="min-h-screen bg-primary py-6 flex flex-col gap-2 justify-center">
            <CalendarContainer tips={tips} statistics={statistics} tip={tip} setTip={setTip} />
            <EditTipForm tip={tip} setTip={setTip} onUpdateTips={handleUpdateTips} />
        </div>
    )
}
'use client'

import { Tip, TipStatistic } from "@/interfaces"

import CalendarContainer from "./calendarContainer"
import EditTipForm from "./editTipForm"
import { useState } from "react"


interface Props{
    tips: Tip[]
    statistics: TipStatistic[]
}

export default function TipsContainer({tips, statistics}: Props){
    const [tip, setTip] = useState<undefined | null | Tip>(null)

    return (
        <div className="min-h-screen bg-primary flex flex-col gap-2 justify-center">
            <CalendarContainer tips={tips} statistics={statistics} tip={tip} setTip={setTip} />
            <EditTipForm tip={tip} setTip={setTip} />
        </div>
    )
}
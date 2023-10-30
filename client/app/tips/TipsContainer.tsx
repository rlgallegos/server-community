'use client'

import { Tip, TipStatistic } from "@/interfaces"

import CalendarContainer from "./calendarContainer"
import EditTipForm from "./editTipForm"


interface Props{
    tips: Tip[]
    statistics: TipStatistic[]
}

export default function TipsContainer({tips, statistics}: Props){
    return (
        <div className="min-h-screen bg-primary flex flex-col gap-2 justify-center">
            <CalendarContainer tips={tips} statistics={statistics} />
            <EditTipForm />
        </div>
    )
}
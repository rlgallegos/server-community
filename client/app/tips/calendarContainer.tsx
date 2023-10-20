'use client'

import { useEffect, useState } from "react"
import Calendar, { OnClickFunc } from "react-calendar"
import { Tip, TipStatistic } from "@/interfaces"

interface Props{
    tips: Tip[]
    statistics: TipStatistic[]
}

export default function CalendarContainer({tips, statistics}: Props){
    const [date, setDate] = useState<null | string>(null)
    const [tip, setTip] = useState<undefined | null | Tip>(null)

    useEffect(() => {
        const tipObj = tips.find(tip => String(tip.tip_date) == date)
        setTip(tipObj)
    }, [date, tip])

    const today = new Date()
    const handleClickDay: OnClickFunc = (value) => {
        const originalDate = new Date(value);

        const year = originalDate.getFullYear()
        const month = String(originalDate.getMonth() + 1).padStart(2, '0')
        const day = String(originalDate.getDate()).padStart(2, '0')
        
        const formattedDate = `${year}-${month}-${day}`
        
        console.log(formattedDate)
        setDate(formattedDate)
    }

    return (
        <div className="flex flex-col items-center justify-center bg-slate-200 w-1/2 mx-auto">
            <div className="w-1/2 mx-auto bg-slate-100">
                <Calendar
                onClickDay={handleClickDay}
                className='react-calendar'
                minDetail="month"
                maxDetail="month"
                maxDate={today}
                showNeighboringMonth={false}
                />
            </div>
            <div>
                
            </div>
            <div>
                {date && tip && <div>{tip.tip_amount}</div>}
            </div>
        </div>
    )
}
'use client'

import { useEffect, useState, MouseEvent } from "react"
import Calendar, { OnClickFunc } from "react-calendar"
import { Tip, TipStatistic } from "@/interfaces"

interface Props{
    tips: Tip[]
    statistics: TipStatistic[]
}

export default function CalendarContainer({tips, statistics}: Props){
    const [date, setDate] = useState<null | string>(null)
    const [tip, setTip] = useState<undefined | null | Tip>(null)
    const [dayNight, setDayNight] = useState<null | string>(null)
    const [avgTips, setAvgTips] = useState<undefined | null | number>(null)
    const [dayOfWeek, setDayOfWeek] = useState<string>('')
    // const [userDate, setUserDate] = useState<string>('')

    useEffect(() => {
        if (date && dayNight && dayOfWeek) {
            // User Tips
            const tipObj = tips.find(tip => String(tip.tip_date) == date && dayNight == tip.day_night)
            setTip(tipObj)
            // Restaurant Stats
            const dayStat = statistics.find(stat => stat.day_night == dayNight && stat.day_of_week == dayOfWeek)
            setAvgTips(dayStat?.average_tip)
        }
    }, [date, dayNight, tip])

    const today = new Date()
    const handleClickDay: OnClickFunc = (value) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        setDayOfWeek(daysOfWeek[value.getUTCDay()])


        // Formatting the Date for DB purposes
        const year = value.getFullYear()
        const month = String(value.getMonth() + 1).padStart(2, '0')
        const day = String(value.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`
        setDate(formattedDate)
    }
    const handleSetDayNight = (e: MouseEvent<HTMLButtonElement>) => {
        setDayNight(e.currentTarget.textContent)
    }

    return (
        <div className="flex flex-col items-center justify-center bg-slate-200 w-1/2 mx-auto">

            {/* Date */}
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

            {/* Time */}
            {date && <div className="flex justify-evenly gap-0 border border-black w-1/2 text-center cursor-pointer">
                <button className={`w-1/2 hover:bg-yellow-300 ${dayNight == 'Day' && 'bg-yellow-300'}`} onClick={handleSetDayNight}>Day</button>
                <button className={`w-1/2 hover:bg-violet-300 ${dayNight == 'Night' && 'bg-violet-300'}`} onClick={handleSetDayNight}>Night</button>
            </div>}

            {/* Result */}
            <div className="w-2/3 bg-slate-50 text-center">
                {tip && <div className="">
                    <h3>${tip.tip_amount}</h3>
                    <h4>{tip.day_night}</h4>
                    <h4>Average For Shift: {avgTips}</h4>
                </div>}
            </div>
        </div>
    )
}
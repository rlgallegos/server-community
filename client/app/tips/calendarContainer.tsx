'use client'

import { useState } from "react"
import Calendar from "react-calendar"



export default function CalendarContainer(){
    const [date, setDate] = useState<null | Date>(null)

    const today = new Date()

    return (
        <div className="flex items-center justify-center bg-slate-200 w-1/2 mx-auto">
            <div className="w-1/2 mx-auto bg-slate-100">
                <Calendar
                className='react-calendar'
                minDetail="month"
                maxDetail="month"
                maxDate={today}
                showNeighboringMonth={false}
                />
            </div>
        </div>
    )
}
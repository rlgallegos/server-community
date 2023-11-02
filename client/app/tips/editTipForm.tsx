'use client'

import { Tip } from "@/interfaces"
import { ChangeEvent, FormEvent, useState, Dispatch, SetStateAction } from "react"
import { fetchEditTips } from "../services/fetches"

interface Props {
    tip: Tip | undefined | null
    setTip: Dispatch<SetStateAction<Tip | null | undefined>>
    onUpdateTips: (id: number, amt: number) => void
}

export default function EditTipForm({tip, setTip, onUpdateTips}: Props){
    const [newTip, setNewTip] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTip(e.target.value)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (tip?.id){
            const updatedTip: Tip = await fetchEditTips(tip.id, newTip)
            setTip(updatedTip)
            onUpdateTips(tip.id, updatedTip.tip_amount)
        }
    }

    return (
        <div className="w-[700px] mx-auto border border-accent bg-secondary">

            <form onSubmit={handleSubmit} className="flex justify-evenly gap-6 py-4">
                <input className="bg-accent px-2" type="number" value={newTip} onChange={handleChange} />
                <button type="submit" className="bg-accent hover:bg-slate-100 px-4 py-2 border border-black"
                >Edit Tip</button>
            </form>

        </div>
    )
}
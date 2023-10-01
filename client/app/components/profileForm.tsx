'use client'

import { FormEvent, useState } from "react";

interface FormData {
    username: string
    image: string
}

export default function ProfileForm(){
    const [formData, setFormData] = useState<FormData>({
        username: '',
        image: ''
    })
    function handleEditDetails(e: FormEvent){
        e.preventDefault()
    }
    function handleChange(e: FormEvent){
        console.log(e)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="w-1/2 h-1/2 mx-auto bg-slate-100">
            <h3>Edit Details</h3>
            <div>
                <form onSubmit={handleEditDetails}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}  />
                    <button type="submit">Submit Changes</button>
                </form>
            </div>
        </div>
    )
}
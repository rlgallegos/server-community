'use client'

import { FormEvent, ChangeEvent, useState } from "react";

interface FormData {
    username: string
    image: string
}

export default function ProfileForm(){
    const [formData, setFormData] = useState<FormData>({
        username: '',
        image: ''
    })
    const [imageFile, setImageFile] = useState<File | null>(null)


    function handleEditDetails(e: FormEvent){
        e.preventDefault()
        // handle image upload
        if (imageFile){
            try {
                console.log(imageFile)
            } catch (error) {
                console.log(error)
            }
        }
    }

    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeFile(e){
        const file = e.target.files[0]
        setImageFile(file)
    }

    return (
        <div className="w-1/2 h-1/2 mx-auto bg-slate-100">
            <h3>Edit Details</h3>
            <div>
                <form onSubmit={handleEditDetails}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}  />
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} />
                    <button type="submit">Submit Changes</button>
                </form>
            </div>
        </div>
    )
}
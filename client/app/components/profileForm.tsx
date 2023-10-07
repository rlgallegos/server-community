'use client'

import { FormEvent, ChangeEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

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
        try {
            const request = new FormData()
            request.append('file', imageFile as Blob, 'image.jpg')
            request.append('username', formData.username)
            console.log(request)

            fetch(`${API_URL}/user`, {
                method: "PATCH",
                body: request
            })
        } catch (error) {
            console.log(error)
        }
    
    }

    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeFile(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files
        if (files){
            setImageFile(files[0])
        }
    }

    return (
        <div className="w-1/2 h-full mx-auto bg-slate-100">
            <h3>Edit Details</h3>
            <div>
                <form onSubmit={handleEditDetails}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}  />
                    <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} />
                    <button type="submit">Submit Changes</button>
                </form>
            </div>
        </div>
    )
}
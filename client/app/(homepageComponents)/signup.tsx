import { useState, FormEvent, ChangeEvent } from "react"


const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

interface FormData {
    username: string
    image: string
}

export default function Signup(){
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [formData, setFormData] = useState<FormData>({
        username: '',
        image: ''
    })

    function handleSignup(e: FormEvent){
        e.preventDefault()
        // handle image upload
        try {
            const request = new FormData()
            request.append('file', imageFile as Blob, 'image.jpg')
            request.append('username', formData.username)
            console.log(request)

            fetch(`${API_URL}/users`, {
                method: "POST",
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
        <div className="mx-auto w-1/2">
            <form className="" onSubmit={handleSignup}>
                <input type="text" name="username" value={formData.username} onChange={handleChange}  />
                <input className="cursor-pointer" type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} />
                <button className="cursor-pointer" type="submit">Create Profile</button>
            </form>
        </div>
    )
}
import { useState, FormEvent, ChangeEvent, ChangeEventHandler } from "react"


const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

interface FormData {
    username: string
    role: string
}

export default function Signup(){
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [formData, setFormData] = useState<FormData>({
        username: '',
        role: ''
    })

    function handleSignup(e: FormEvent){
        e.preventDefault()
        // handle image upload
        try {
            const request = new FormData()
            request.append('file', imageFile as Blob, 'image.jpg')
            request.append('username', formData.username)
            request.append('role', formData.role)
            console.log(request)

            fetch(`${API_URL}/users`, {
                method: "POST",
                body: request
            })
        } catch (error) {
            console.log(error)
        }
    
    }
    
    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>){
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
    console.log(formData)


    return (
        <div className="mx-auto w-1/2">
            <form className="flex flex-col gap-y-4" onSubmit={handleSignup}>
                <label htmlFor="signup-username">Choose username:</label>
                <input id="signup-username" type="text" name="username" value={formData.username} onChange={handleChange}  />
                
                <label htmlFor="signup-dropdown">Select an option:</label>
                <select id="signup-dropdown" name="role" value={formData.role} onChange={handleChange}>
                    <option value="server">Server</option>
                    <option value="bartender">Bartender</option>
                </select>

                <input className="cursor-pointer" type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} />
                
                <button className="cursor-pointer bg-white text-black w-1/2 mx-auto" type="submit">Create Profile</button>
            </form>
        </div>
    )
}
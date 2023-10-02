import { useState, FormEvent, ChangeEvent } from "react"


const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

interface FormData {
    username: string
    role: string
    password: string
}
interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>;
}
  
export default function Signup({ setIsLoggedIn }: Props){
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [formData, setFormData] = useState<FormData>({
        username: '',
        role: '',
        password: ''
    })

    function handleSignup(e: FormEvent){
        e.preventDefault()
        // handle image upload
        try {
            const request = new FormData()
            request.append('file', imageFile as Blob, 'image.jpg')
            request.append('username', formData.username)
            request.append('role', formData.role)
            request.append('password', formData.password)

            fetch(`${API_URL}/users`, {
                method: "POST",
                body: request
            }).then(res => {
                if (res.ok){
                    res.json().then(data => {
                        setIsLoggedIn(true)
                        console.log(data)
                    })
                } else {
                    console.log('response not ok')
                }
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
            <h2>Create a New Account</h2>
            <form className="flex flex-col gap-y-4" onSubmit={handleSignup}>
                <label htmlFor="signup-username">Choose username:</label>
                <input id="signup-username" type="text" name="username" value={formData.username} onChange={handleChange}  />
                
                <label htmlFor="signup-dropdown">Select an option:</label>
                <select id="signup-dropdown" name="role" value={formData.role} onChange={handleChange}>
                    <option value="server">Server</option>
                    <option value="bartender">Bartender</option>
                </select>
                <label>Set Password:</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange}/>

                <input className="cursor-pointer" type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleChangeFile} />
                
                <button className="cursor-pointer bg-white text-black w-1/2 mx-auto" type="submit">Create Profile</button>
            </form>
        </div>
    )
}
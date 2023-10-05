
import { useState, ChangeEvent, FormEvent } from "react"



const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL;

interface FormData {
    username: string
    password: string
}
interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function LoginForm({ setIsLoggedIn}: Props){
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    })

    function handleLogin(e: FormEvent){
        e.preventDefault()
        console.log('Sending Login')
        if (!formData.username || !formData.password){
            setError('Please Enter Username and Password')
            return
        }
        
        fetch(`${API_URL}/login`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.ok){
                res.json().then(data => {
                    console.log(data)
                    setIsLoggedIn(true)
                })
            } else {
                console.log('Login Failed')
            }
        })
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    console.log('rendering login component')

    return <div className="w-1/2">
            <h2>Login</h2>
            <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
                <label>Username:</label>
                <input className="text-black" type="text" name="username" value={formData.username} onChange={handleChange}  />
                
                <label>Password:</label>
                <input className="text-black" type="text" name="password" value={formData.password} onChange={handleChange}/>
                
                <button className="cursor-pointer bg-white text-black w-1/2 mx-auto" type="submit">Login</button>
                {error && <p className="mx-auto text-red-700 ">{error}</p>}
            </form>
    </div>
}
import { useState, ChangeEvent, FormEvent } from "react"



const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

interface FormData {
    username: string
    password: string
}
interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function LoginForm({ setIsLoggedIn}: Props){
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    })

    function handleLogin(e: FormEvent){
        e.preventDefault()
        fetch(`${API_URL}/login`, {
            method: "POST",
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

    return <div className="w-1/2">
            <h2>Login</h2>
            <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
                <label htmlFor="login-username">Username:</label>
                <input id="login-username" type="text" name="username" value={formData.username} onChange={handleChange}  />
                
                <label>Password:</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange}/>
                
                <button className="cursor-pointer bg-white text-black w-1/2 mx-auto" type="submit">Login</button>
            </form>
    </div>
}
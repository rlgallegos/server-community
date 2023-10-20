import { User } from "@/interfaces"



export default function HomeLoggedIn({userData}: {userData : User | null}){
    if (userData){
        return (
            <div className="min-h-screen flex flex-col bg-slate-300">
                <h1>Hello {userData.name}!</h1>
            </div>
        )
    }
}
import { User } from "@/interfaces"



export default function HomeLoggedIn({userData}: {userData : User | null}){
    if (userData){
        return (
            <div className="bg-primary py-6 min-h-screen flex flex-col">
                <h1>Hello {userData.name}!</h1>
            </div>
        )
    }
}
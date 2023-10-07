import { User } from "@/interfaces"



export default function HomeLoggedIn({userData}: {userData : User | null}){
    if (userData){
        return (
            <div>
                <h1>Hello {userData.name}!</h1>
            </div>
        )
    }
    else {
        return <div>Error. Please Log Back In</div>
    }
}
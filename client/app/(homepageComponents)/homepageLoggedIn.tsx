import { User } from "@/interfaces"



export default function HomeLoggedIn({userData}: {userData : User | null}){

    return (
        <div>
            <h1>User is Logged in</h1>
        </div>
    )
}
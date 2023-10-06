

import store from "@/authorization"
import { redirect } from "next/navigation"

export default function Page() {
    const state = store.getState()
    if (!state.isAuthenticated){
        redirect('/')
    } else {
        console.log(state)
    }
    return (
        <div className="min-h-screen bg-blue-300">
            <h1>The Info Page</h1>
        </div>
    )
}
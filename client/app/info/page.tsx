import { getServerSession } from "next-auth"


export default async function Page() {
    const session = await getServerSession()

    if (session && session.user){
        return (
            <div className="min-h-screen bg-blue-300">
                <h1>The Info Page</h1>
            </div>
        )
    }
}
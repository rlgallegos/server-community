import { getServerSession } from "next-auth"

import InfoContainer from "./infoContainer"


export default async function Page() {
    const session = await getServerSession()

    if (session?.user?.email){
        return (
            <div className="min-h-screen bg-blue-300">
                <h1>The Info Page</h1>
                <InfoContainer email={session.user.email} />
            </div>
        )
    }
}
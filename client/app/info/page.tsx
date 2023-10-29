import { getServerSession } from "next-auth"

import InfoContainer from "./infoContainer"


export default async function Page() {
    const session = await getServerSession()

    if (session?.user?.email){
        return (
            <InfoContainer email={session.user.email} />
        )
    }
}
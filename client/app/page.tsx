import { getServerSession } from 'next-auth'
import Homepage from './(homepageComponents)/homepage'

export default async function Home() {
    const session = await getServerSession()
    if (session?.user){
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${session.user.email}`)
        if (userResponse.ok){
            const userData = await userResponse.json()
            return (
                <Homepage user={userData} />
            )
        }
    } else {
        return <Homepage user={null} />
    }
}

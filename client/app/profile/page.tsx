import NavBar from "../components/navbar"
import ProfileForm from "../components/profileForm"



export default function Page(){


    return <div className="min-h-screen bg-green-300 flex flex-col text-black">
        <NavBar />
        <h1>Profile Page</h1>
        <ProfileForm />
    </div>
}
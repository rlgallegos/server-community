import NavBar from "../components/components"
import ProfileForm from "../components/profileForm"



export default function Page(){


    return <div className="min-h-full bg-white flex flex-col text-black">
        <NavBar />
        <h1>Profile Page</h1>
        <ProfileForm />
    </div>
}
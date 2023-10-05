import NavBar from "../components/navbar"
import ProfileForm from "../components/profileForm"
import UserInfo from "../callback/userInfo"

import Test from "./test"

export default function Page(){



    return <div className="min-h-screen bg-green-300 flex flex-col text-black">
        <h1>Profile Page</h1>
        <Test />
        {/* <UserInfo /> */}
        {/* <ProfileForm /> */}
    </div>
}

import LoginForm from "../components/loginForm"
import Signup from "./signup"

interface Props {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function HomeLoggedOut({isLoggedIn, setIsLoggedIn}: Props){
    return (
        <div>
            <h1>User is logged out</h1>
            <div className="flex">
                <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Signup setIsLoggedIn={setIsLoggedIn} />
            </div>
        </div>
    )
}
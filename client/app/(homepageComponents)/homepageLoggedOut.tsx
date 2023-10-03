
import LoginForm from "../components/loginForm"
import SignupForm from "../components/signupForm"

interface Props {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function HomeLoggedOut({isLoggedIn, setIsLoggedIn}: Props){
    return (
        <div>
            <h1>User is logged out</h1>
            <div className="flex w-5/6 mx-auto gap-2">
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
                <SignupForm setIsLoggedIn={setIsLoggedIn} />
            </div>
        </div>
    )
}
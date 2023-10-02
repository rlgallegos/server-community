
import LoginForm from "../components/loginForm"

interface Props {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function HomeLoggedOut({isLoggedIn, setIsLoggedIn}: Props){
    return (
        <div>
            <h1>User is logged out</h1>
            <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}
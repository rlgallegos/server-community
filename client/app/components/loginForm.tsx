

interface Props {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>
  }

export default function LoginForm({isLoggedIn, setIsLoggedIn}: Props){

    function handleLogin(){
        setIsLoggedIn(!isLoggedIn)
    }


    return <div>
        <button onClick={handleLogin}>Log In</button>
    </div>
}
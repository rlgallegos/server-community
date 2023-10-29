import SignInButton from "../components/SignInButton"



export default function HomeLoggedOut(){
    return (
        <div className="bg-primary min-h-screen flex flex-col">
            <h1>Welcome to Server Community!</h1>
            <h3>The place where hospitality workers connect.</h3>
            <SignInButton />
        </div>
    )
}
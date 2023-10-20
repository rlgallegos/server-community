import SignInButton from "../components/SignInButton"



export default function HomeLoggedOut(){
    return (
        <div className="min-h-screen flex flex-col bg-slate-300">
            <h1>Welcome to Server Community!</h1>
            <h3>The place where hospitality workers connect.</h3>
            <SignInButton />
        </div>
    )
}
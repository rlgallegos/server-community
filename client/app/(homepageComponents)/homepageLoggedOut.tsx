import SignInButton from "../components/SignInButton"



export default function HomeLoggedOut(){
    return (
        <div className="bg-primary min-h-screen flex flex-col items-center justify-center">
            <div className="border border-accent p-2">
                <SignInButton />
            </div>
        </div>
    )
}
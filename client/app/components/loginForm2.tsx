import { useEffect } from "react";


const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const callbackURL = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL

export default function LoginForm2(){
    let oauthUrl = ""
    useEffect(() => {
        oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=openid%20email%20profile`
    }, []);

    function handleLogin(){
        window.location.href = oauthUrl;
    }
    return (
        <div>
            <button onClick={handleLogin}>Login with OAuth</button>
        </div>
    )
}
import SignInButton from "../components/SignInButton"

import { whoWeAreTitles, whoWeAreParagraphs } from "../data"



export default function HomeLoggedOut(){

    const intro = []
    for (let i = 0; i < whoWeAreTitles.length; i++){
        intro.push(<div className="my-4">
            <h3 className="font-bold">{whoWeAreTitles[i]}</h3>
            <p>{whoWeAreParagraphs[i]}</p>
        </div>)
    }

    return (
        <div className="bg-primary py-6 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-secondary border border-accent">
                {intro}
                <div className="my-4 ">
                <p>{whoWeAreParagraphs[whoWeAreParagraphs.length - 1]}</p>
                </div>
            </div>
            <div className="border border-accent p-2 mt-8">
                <SignInButton />
            </div>
        </div>
    )
}
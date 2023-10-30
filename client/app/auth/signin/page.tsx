'use client'
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Providers } from "@/interfaces";
import { redirect } from "next/navigation";


export default function signin() {
    const [providers, setProviders] = useState<Providers | null>(null)

    const {data: session} = useSession()
    if (session){
        return redirect('/')
    }

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }
        fetchProviders()
    }, [])

    let providerList: React.JSX.Element[] = []
    if (providers){
        providerList = Object.keys(providers).map(provider => {
            return (
                <div key={provider} className="flex gap-4 items-center justify-center">
                    <button className="px-4 py-2 bg-accent"
                    onClick={() => signIn(providers[provider].id)}>{providers[provider].name}</button>
                </div>
            )
        })
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col justify-center items-center">
            <div className="p-2 border border-accent">
                <div className="bg-secondary p-4">
                    <h2 className="mb-6 text-xl">Choose Provider To Login With:</h2>
                    <ul className="flex flex-col gap-4">
                        {providerList && providerList}
                    </ul>
                </div>
            </div>
        </div>
    )
}
'use client'
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { Providers } from "@/interfaces";


export default function signin() {
    const [providers, setProviders] = useState<Providers | null>(null)

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
                <div key={provider}>
                    <h3>{providers[provider].name}</h3>
                    <button onClick={() => signIn(providers[provider].id)}>{providers[provider].name}</button>
                </div>
            )
        })
    }

    return (
        <div className="min-h-screen bg-primary">
            <ul>
                {providerList && providerList}
            </ul>
        </div>
    )
}
'use client'
import { providers, getProviders, signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Provider } from "@/interfaces";

interface Providers {
    [key:string]: Provider
}

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
            {/* {Object.values(providers).map((provider: JSX.Element) => {
            return (
                <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                </button>
                </div>
            );
            })} */}
        </div>
    );
}
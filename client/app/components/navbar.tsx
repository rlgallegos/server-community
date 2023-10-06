'use client'
import Link from 'next/link'
import Image from 'next/image'
import SignInButton from './SignInButton'
import { useSession } from 'next-auth/react'


export default function NavBar() {
    const {data:session} = useSession()
    if (session && session.user){
        console.log('sesison')
    }

    return (
        <nav className='w-full h-8 flex justify-evenly items-center gap-2 bg-white text-black'>
            <Link href='/'>Home</Link>
            <Link href='/info'>Info</Link>
            <Link href='/profile'>Profile</Link>
            <SignInButton />
            {/* {(session && session.user) && <Image src={} />} */}
        </nav>
    )
}
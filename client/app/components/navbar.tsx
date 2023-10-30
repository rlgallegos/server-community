'use client'
import Link from 'next/link'
import SignInButton from './SignInButton'

export default function NavBar() {

    return (
        <nav className='w-full h-8 flex justify-evenly items-center gap-2 bg-accent fixed top-0'>
            <Link href='/'>Home</Link>
            <Link href='/info'>Info</Link>
            <Link href='/profile'>Profile</Link>
            <Link href='/tips'>Tips</Link>
            <Link href='/rooms'>Rooms</Link>
            <SignInButton />
        </nav>
    )
}
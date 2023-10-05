'use client'
import Image from 'next/image'

import { User } from '@/interfaces'


export default function UserInfo({ userData }: { userData: User }) {
    return (
        <div className='w-full mx-auto flex flex-col items-center justify-center'>
            <Image src={userData.image} alt='user' height={300} width={300}/>
            <h1>{userData.name}</h1>
            <h3>Email: {userData.email}</h3>
            <h3>Restaurant: {userData.restaurant ? userData.restaurant : 'Not Selected'}</h3>
            <h3>Job: {userData.role ? userData.role : 'Not Selected'}</h3>
        </div>
    )
}
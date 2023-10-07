'use client'
import Image from "next/image"

import { User, Restaurant } from "@/interfaces"

import AddRestaurantForm from "./addRestaurantForm"

interface Props{
    userData: User,
    restaurantData: Restaurant[]
}


export default function UserProfile({userData, restaurantData}: Props){


    return <div>
        <div className='w-full mx-auto flex flex-col items-center justify-center'>
            <Image src={userData.image} alt='user' height={300} width={300}/>
            <h1>{userData.name}</h1>
            <h3>Email: {userData.email}</h3>
            <h3>Restaurant: {userData.restaurant ? userData.restaurant.name : 'None Selected'}</h3>
            <h3>Job: {userData.role ? userData.role : 'None Selected'}</h3>
            <AddRestaurantForm restaurantData={restaurantData} />
        </div>
    </div>
}
'use client'
import { User, Restaurant } from "@/interfaces"

import AddRestaurantForm from "./addRestaurantForm"
import ClickableImage from "../components/clickableImage"
import { useState } from "react"

interface Props{
    user: User,
    restaurantData: Restaurant[]
}

export default function UserProfile({user, restaurantData}: Props){
    const [error, setError] = useState<string>('')
    const [userData, setUserData] = useState<User>(user)

    async function handleUpdateImage(file: File){
        if (file){
            const request = new FormData()
            request.append('file', file as Blob, 'image.jpg')

            const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${userData.id}`, {
                method: "PATCH",
                body: request
            })
            if (res.ok){
                res.json().then(data => setUserData(data))
            } else {
                res.json().then(e => setError(e.error))
            }
        }
    }

    return <div className="min-h-screen bg-primary py-6 flex">
        <div className='w-full mx-auto flex flex-col items-center justify-evenly'>
            <ClickableImage src={userData.image} alt='user' height={300} width={300} callback={handleUpdateImage} />
            {error && <p>{error}</p>}
            <div className="w-1/2 bg-secondary border border-accent p-6 flex flex-col gap-1">
                <h1>{userData.name}</h1>
                <h3>Email: {userData.email}</h3>
                <h3>Restaurant: {userData.restaurant ? userData.restaurant.name : 'None Selected'}</h3>
                <h3>Job: {userData.role ? userData.role : 'None Selected'}</h3>
            </div>
            <AddRestaurantForm userData={userData} setUserData={setUserData} restaurantData={restaurantData} />
        </div>
    </div>
}
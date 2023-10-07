'use client'
import { User, Restaurant } from "@/interfaces"

import AddRestaurantForm from "./addRestaurantForm"
import ClickableImage from "../components/clickableImage"
import { useState } from "react"

interface Props{
    userData: User,
    restaurantData: Restaurant[]
}

export default function UserProfile({userData, restaurantData}: Props){
    const [error, setError] = useState<string>('')

    async function handleUpdateImage(file: File){
        if (file){
            const request = new FormData()
            request.append('file', file as Blob, 'image.jpg')

            const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${userData.id}`, {
                method: "PATCH",
                body: request
            })
            if (res.ok){
                res.json().then(data => console.log(data))
            } else {
                res.json().then(e => setError(e.error))
            }
        }
    }

    return <div>
        <div className='w-full mx-auto flex flex-col items-center justify-center'>
            <ClickableImage src={userData.image} alt='user' height={300} width={300} callback={handleUpdateImage} />
            {error && <p>{error}</p>}
            <h1>{userData.name}</h1>
            <h3>Email: {userData.email}</h3>
            <h3>Restaurant: {userData.restaurant ? userData.restaurant.name : 'None Selected'}</h3>
            <h3>Job: {userData.role ? userData.role : 'None Selected'}</h3>
            <AddRestaurantForm userID={userData.id} restaurantData={restaurantData} />
        </div>
    </div>
}
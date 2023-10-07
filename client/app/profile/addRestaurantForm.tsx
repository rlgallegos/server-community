'use client'
import { v4 as uuidv4 } from 'uuid';

import { Restaurant } from "@/interfaces"
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props{
    restaurantData: Restaurant[]
    userID: number
}


export default function AddRestaurantForm({restaurantData, userID}: Props){
    const [selectedRestaurant, setSelectedRestaurant] = useState<number | string>(0)
    const [role, setRole] = useState<string>('')
    const [error, setError] = useState<string>('')

    const restaurantOptions = restaurantData.map((restaurant: Restaurant) => {
        return <option key={uuidv4()} value={restaurant.id}>{restaurant.name}</option>
    })

    function handleSelectRest(e: ChangeEvent<HTMLSelectElement>){
        setSelectedRestaurant(e.target.value)
    }
    function handleSelectRole(e: ChangeEvent<HTMLSelectElement>){
        setRole(e.target.value)
    }
    function handleLinkRestaurant(e: FormEvent){
        e.preventDefault()
        const request = {
            'restaurant_id' : selectedRestaurant,
            'role': role
        }

        fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${userID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then(res => {
            if (res.ok){
                res.json().then(data => console.log(data))
            } else {
                res.json().then(e => setError(e))
            }
        })
    }

    return (
        <div className="">
            <form className='flex flex-col gap-4' onSubmit={handleLinkRestaurant}>
                <div className='flex gap-4'>
                    <select value={selectedRestaurant} onChange={handleSelectRest}>
                        <option disabled value='0'>Choose Restaurant:</option>
                        {restaurantOptions}
                    </select>
                    <select value={role} onChange={handleSelectRole}>
                        <option value="" disabled>Choose Your Role:</option>
                        <option value="Server">Server</option>
                        <option value="Bartender">Bartender</option>
                        <option value="Busser">Busser</option>
                    </select>
                </div>
                <button type='submit' className='bg-white border border-black rounded-md'>Link Restaurant</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
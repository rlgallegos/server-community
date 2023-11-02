'use client'
import { v4 as uuidv4 } from 'uuid';

import { Restaurant } from "@/interfaces"
import { ChangeEvent, FormEvent, SetStateAction, Dispatch, useState } from 'react';
import { User } from '@/interfaces';

interface Props{
    restaurantData: Restaurant[]
    userData: User
    setUserData: Dispatch<SetStateAction<User>>
}


export default function AddRestaurantForm({restaurantData, userData, setUserData}: Props){
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
        if (!selectedRestaurant || !role){
            setError('Please Select A Restaurant and Role.')
            return
        }
        const request = {
            'restaurant_id' : selectedRestaurant,
            'role': role
        }

        fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/user/${userData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then(res => {
            if (res.ok){
                res.json().then(data => setUserData(data))
            } else {
                res.json().then(e => setError(e.error))
            }
        })
    }

    return (
        <div className="bg-secondary border border-accent p-6">
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
                <button type='submit' className='bg-accent border border-black rounded-md'>Link Restaurant</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}
'use client'
import { Restaurant } from "@/interfaces"


interface Props{
    restaurantData: Restaurant[]
}


export default async function AddRestaurantForm({restaurantData}: Props){
    console.log(restaurantData)

    const restaurantOptions = restaurantData.map((restaurant: Restaurant) => {
        <option value={restaurant.id}>{restaurant.name}</option>
    })

    return (
        <div className="">
            <form>
                {restaurantOptions}
            </form>
        </div>
    )
}
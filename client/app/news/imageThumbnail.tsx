'use client'

import Image from "next/image";
import { RSSFeedItem } from "@/interfacesRSS"
import { v4 as uuidv4 } from 'uuid';


export default function ImageThumbnail({entry}: {entry: RSSFeedItem}){

    const handleClick  = () => {
        window.location.href = entry.link
    }

    return (
        <div key={uuidv4()} className="bg-green-100 cursor-pointer mx-1 flex flex-col gap-8 py-6 aspect-square" onClick={handleClick} >

            <div className={`w-2/3 mx-auto aspect-square flex items-center`}>
                <Image src={entry.image_src} alt={entry.image_alt} height={250} width={250} priority />
            </div>
            <div className="mx-auto text-center flex flex-col justify-start bg-blue-700 h-full">
                <h3 className="h-1/2">{entry.title}</h3>
            </div>

        </div>
    )
}
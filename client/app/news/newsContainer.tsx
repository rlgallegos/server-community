'use client'

import { EateryFeedItem } from "@/interfacesRSS"
import Image from "next/image"
import { useState } from "react"
import ExpandedArticle from "./expandedArticle"
import { v4 as uuidv4 } from 'uuid';

interface Props{
    rssData: EateryFeedItem[]
}

export default function NewsContainer({rssData}: Props){
    const [article, setArticle] = useState<null | React.ReactNode>(null)
    const handleClick = (entry: EateryFeedItem) => {
        setArticle(<ExpandedArticle entry={entry} />)
    }

    const entryThumbnails = rssData.map(entry  => {
        return (
            <div key={uuidv4()} 
            className="bg-green-100 mx-1 flex flex-col py-6 w-screen aspect-square" 
            onClick={() => handleClick(entry)}>

            <div className={`w-2/3 mx-auto aspect-square flex items-center`}>
                <Image src={entry.image_src} alt={entry.image_alt} height={500} width={500} />
            </div>
                <h3>{entry.title}</h3>
                <p>{entry.link}</p>
            </div>
        )
    })

    return (
        <div className="h-screen bg-primary py-12 flex flex-col items-center justify-center">
            {/* Vertical Scrolling of Page */}
            <div className="flex flex-col overflow-y-scroll w-full">
                {/* Carousel for articles */}
                <div className="flex  w-full bg-red-100 overflow-x-scroll h-[400px]">
                    {entryThumbnails}

                </div>
                {/* Container for article */}
                <div>
                    {article}
                </div>

            </div>
        </div>
    )
}
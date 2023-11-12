'use client'

import { RSSFeedItem, RSSData } from "@/interfacesRSS"

import ImageThumbnail from "./imageThumbnail"
import { v4 as uuidv4 } from 'uuid';

interface Props{
    rssData: RSSData
}

export default function NewsContainer({rssData}: Props){

    const eateryData: RSSFeedItem[] = rssData.eater_entries
    const nyTimesData: RSSFeedItem[] = rssData.ny_entries

    const eateryEntryThumbnails = eateryData.map(entry  => <ImageThumbnail key={uuidv4()} entry={entry} />)
    const nyTimesEntryThumbnails = nyTimesData.map(entry => <ImageThumbnail key={uuidv4()} entry={entry} />)

    return (
        <div className="h-screen bg-primary py-12 flex flex-col gap-4 justify-evenly">
            {/* Vertical Scrolling of Page */}

                <h1 className="text-3xl">Eatery:</h1>
                <div className="flex  w-full bg-red-100 overflow-x-scroll h-[500px]">
                    {eateryEntryThumbnails}
                </div>
                <h1 className="text-3xl">NY imes:</h1>
                <div className="flex  w-full bg-red-100 overflow-x-scroll h-[500px]">
                    {nyTimesEntryThumbnails}
                </div>

      
        </div>
    )
}
'use client'

import { EateryFeedItem } from "@/interfacesRSS"

interface Props{
    rssData: EateryFeedItem[]
}

export default function NewsContainer({rssData}: Props){
    const handleClick = () => {

    }

    const entryThumbnails = rssData.map(entry  => {
        return (
            <div className="flex flex-col" onClick={handleClick}>
                <img src={entry.main_image_src} alt={entry.main_image_alt} />
                <h3>{entry.title}</h3>
            </div>
        )


        // const parsedEntry = parse(entry.summary)
        // return parsedEntry
    })

    return (
        <div>
            {/* Container for article */}
            <div>

            </div>
            {/* Carousel for articles */}
            <div className="flex">
                {entryThumbnails}
            </div>
        </div>
    )
}
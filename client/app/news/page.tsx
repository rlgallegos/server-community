import { fetchRSSFeeds } from "../services/fetches"
import parse from 'html-react-parser'

import { EateryFeedItem } from "@/interfacesRSS"
import NewsContainer from "./newsContainer"



export default async function News(){
    const rssData: EateryFeedItem[] = await fetchRSSFeeds()
    

    return (
        <div>
            <NewsContainer rssData={rssData} />
        </div>
    )
}
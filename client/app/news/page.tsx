import { fetchRSSFeeds } from "../services/fetches"


import { RSSData } from "@/interfacesRSS"
import NewsContainer from "./newsContainer"

export default async function News(){
    const rssData: RSSData = await fetchRSSFeeds()
    

    return (
        <div>
            <NewsContainer rssData={rssData} />
        </div>
    )
}
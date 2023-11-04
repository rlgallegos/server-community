// NY Eatery RSS interfaces

export interface RSSFeedItem {
    title: string
    link: string
    image_src: string
    image_alt: string
}

export interface RSSData {
    ny_entries: RSSFeedItem[]
    eater_entries: RSSFeedItem[]
}
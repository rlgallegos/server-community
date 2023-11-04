'use client'
import Image from "next/image"
import { RSSFeedItem } from "@/interfacesRSS"
import { useEffect } from "react"
import parse from 'html-react-parser'
import { HTMLReactParserOptions, Element } from 'html-react-parser'

interface Props {
    entry: RSSFeedItem
}

export default function ExpandedArticle({entry}: Props){

    const parserOptions: HTMLReactParserOptions = {
        replace(domNode) {
          if (domNode instanceof Element && domNode.attribs) {
            if (domNode.name === 'img'){
                return <img src={domNode.attribs.src} alt={domNode.attribs.alt} className="w-1/2 h-1/4" />
            }
          }
        },
      };

      

    console.log(entry.summary)
    const parsedEntry = parse(entry.summary, parserOptions)
    // console.log(parsedEntry)

    return (
        <div className="w-3/4 p-12 mx-auto border border-accent">
            {parsedEntry}
            {/* <h1>{entry.title}</h1>
            <Image src={entry.main_image_src} alt={entry.main_image_alt} height={500} width={500} /> */}
        </div>
    )
}
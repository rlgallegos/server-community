'use client'

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface Props{
    src: string,
    alt: string,
    height: number,
    width: number
    callback: (file: File) => void
}

export default function ClickableImage({src, alt, height, width, callback}: Props){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleImageClick = () => {
        if (fileInputRef && fileInputRef.current){
            fileInputRef.current.click()
        }
    };
  
    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files){
            callback(files[0])
        }
    };
  

    return (
        <div>
            <Image
            src={src}
            alt={alt}
            height={height}
            width={width}
            onClick={handleImageClick}
            />
            <input 
            type="file" 
            name="image" 
            ref={fileInputRef}
            accept=".jpg, .jpeg, .png" 
            onChange={handleChangeFile} />
        </div>
    )

}
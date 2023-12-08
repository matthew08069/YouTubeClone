'use client';

import { useSearchParams } from "next/navigation";
import React from 'react'
import ReactPlayer from 'react-player'

export default function Watch() {
    const videoSrc = useSearchParams().get('v');
    const videoPrefix = 'https://storage.googleapis.com/matthew08069-yt-processed-videos/';

    return(    
    <div>
        <h1>Watch Page</h1>
        <ReactPlayer url={videoPrefix + videoSrc} controls />
    </div>
    );
}
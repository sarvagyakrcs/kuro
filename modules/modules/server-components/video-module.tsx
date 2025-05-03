import React from 'react'
import { Module } from '@prisma/client'
import { getVideos } from '@/actions/youtube/get-videos'
import { getMostSimilarVideoToNotes } from '@/lib/events/modules/get-video-embeddings'
import { prisma } from '@/lib/db/prisma'
import VideoModuleClient from '../client-components/video-module'

type Props = {
  module: Module
}

const VideoModule = async ({ module }: Props) => {
  if(!module.videoUrl){
    console.log("Finding video")
    const videos = await getVideos(module.name, 5)
    const mostSimilarVideo = await getMostSimilarVideoToNotes(videos)

    await prisma.module.update({
      where: { id: module.id },
      data: { 
        videoUrl: mostSimilarVideo.link 
      }
    })
  }
  console.log("video already in db")
  return (
    <VideoModuleClient module={module} />
  )
}

export default VideoModule

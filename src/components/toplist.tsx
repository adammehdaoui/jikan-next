"use client"

import { useState, useEffect, useCallback } from "react"
import AnimeData from "../app/models/AnimeData"
import Image from "next/image"  

export default function TopList() {
  const [data, setData] = useState<AnimeData[]>([])

  const top = useCallback(() => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10", { method: "GET" })
      .then(res => res.json())
      .then(res => {
        setData(res.data)
      })
  }, [])

  useEffect(() => {
    top()
  }, [top])

  return (
    <div className="ml-5">
      {data.map(item => (
        <div className="italic mt-10 w-full" key={item.mal_id}>
          <h2 className="text-lg font-extrabold">{item.title} : {item.titles.find(item => item.type === "Japanese")?.title}</h2>
          <Image
           src={item.images.jpg.large_image_url}
           width={1920}
           height={1080}
           alt={`image of ${item.title}`}
           className="mt-5 w-1/6"
          />
        </div>
      ))}
    </div>
  )
}
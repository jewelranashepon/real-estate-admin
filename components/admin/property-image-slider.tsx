"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface PropertyImageSliderProps {
  images: { url: string }[]
}

export function PropertyImageSlider({ images }: PropertyImageSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="h-[500px] rounded-xl"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={img.url}
            alt={`Image ${idx + 1}`}
            width={1200}
            height={500}
            className="w-full h-[500px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

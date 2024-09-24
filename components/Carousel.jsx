'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const slides = [
  {
    id: 1,
    title: "Adopt don't Shop",
    description: "Saving one dog will not change the world, but surely for that one dog, the world will change forever.",
    img: "/slider1.jpg",
    url: "/adopt",
    text: "Adopt",
    bg: "bg-black",
  },
  {
    id: 2,
    title: "Rehome don't Abandon",
    description: "Money can buy a fine dog, but only love can make him wag his tail.",
    img: "/slider2.jpg",
    url: "/rehome",
    text: "Rehome",
    bg: "bg-black",
  },
  {
    id: 3,
    title: "Adopt don't Shop",
    description: "Shall we all open our heart to be a forever home for lost pets",
    img: "/slider3.jpg",
    url: "/adopt",
    text: "Adopt",
    bg: "bg-black",
  },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col md:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center p-8 bg-black bg-opacity-50">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl">
                {slide.description}
              </p>
              <Link href={slide.url}>
                <button className="mt-4 px-6 py-3 bg-white bg-opacity-5 text-white font-semibold rounded-full hover:bg-gray-500 transition-colors">
                  {slide.text}
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="flex-1 relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex gap-4">
        {slides.map((slide, index) => (
          <button
            className={`w-3 h-3 rounded-full bg-white bg-opacity-50 transition-all ${
              current === index ? "scale-150 bg-opacity-100" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
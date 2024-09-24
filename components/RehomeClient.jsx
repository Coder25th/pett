'use client'

import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "@/components/rehome/Form"

export default function RehomeClient() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push("/")
      alert("Login first then add pet")
    }
  }, [session, router])

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-8">
      {/* Left Side - Image */}
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="/cat.png"
          alt="Pet rehoming"
          className="rounded-lg shadow-md w-full h-auto object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center md:text-left">
          Rehome your pet
        </h1>
        <Form />
      </div>
    </div>
  )
}

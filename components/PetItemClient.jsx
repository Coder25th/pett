'use client'

import React, { useState } from "react"
import Image from "next/image"
import Modal from "@/components/Adopt/Modal"
import { FaLocationDot } from "react-icons/fa6"

export default function PetItemClient({ pet }) {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <div
        className="flex flex-col bg-gray-900 rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full max-w-xs mx-auto cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="h-56 w-full overflow-hidden rounded-t-lg">
          <img
            src={pet.image}
            alt={pet.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-1 px-3 text-xs text-white">
            {pet.category}
          </div>
          <h2 className="text-2xl font-semibold text-white mb-1">{pet.name}</h2>
          <p className="text-slate-600 flex items-center  mb-1"><span className="text-sm"><FaLocationDot/> </span> {pet.location}</p>
          <p className="text-gray-300 text-sm mb-1">
            <span className="font-bold text-blue-400">Breed: </span>
            {pet.breed}
          </p>
          <p className="text-gray-300 text-sm mb-1">
            <span className="font-bold text-blue-400">Age: </span>
            {pet.age} years old
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-800">
          <div className="flex items-center">
            <Image
              className="rounded-full border-2 border-blue-500"
              src={pet.userImage}
              width={30}
              height={30}
              alt="user"
            />
            <div className="ml-3">
              <span className="text-white font-semibold">{pet.userName}</span>
              <p className="text-gray-400 text-sm">{pet.userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="bg-gray-900 text-blue-400 p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">{pet.name}</h2>
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-1/2">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <p className="mb-4 font-bold text-slate-200">
              <span className="font-bold text-slate-500">Category:</span> {pet.category}
            </p>
            <p className="mb-4 font-bold text-slate-200">
              <span className="font-bold text-slate-500">Breed:</span> {pet.breed}
            </p>
            <p className="mb-4 font-bold text-slate-200">
              <span className="font-bold text-slate-500">Age:</span> {pet.age} years old
            </p>
            <p className="mb-4 font-bold text-slate-200">
              <span className="font-bold text-slate-500">Description:</span> {pet.description}
            </p>
            <div className="flex items-center mt-6">
              <p className="font-bold text-slate-500 mr-2">Owner:</p>
              <Image
                className="rounded-full border-2 border-blue-500"
                src={pet.userImage}
                width={30}
                height={30}
                alt="user"
              />
              <div className="ml-3">
                <span className="font-semibold">{pet.userName}</span>
                <p className="text-gray-400 text-sm">{pet.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

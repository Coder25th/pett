'use client'

import React, { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import app from '@/shared/FirebaseConfig'
import Hero from '@/components/Adopt/Hero'
import PetList from '@/components/Adopt/PetList'
import Pets from '@/components/Adopt/Pets'

export default function AdoptClient() {
    const db = getFirestore(app)
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState([])
    const [category, setCategory] = useState('')

    useEffect(() => {
        getPet()
    }, [])

    const getPet = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "pets"))
            const petsData = []
            querySnapshot.forEach((doc) => {
                petsData.push(doc.data())
            })
            console.log('Fetched pets:', petsData)
            setPets(petsData)
            setFilteredPets(petsData)
        } catch (error) {
            console.error("Error fetching pets:", error)
        }
    }

    useEffect(() => {
        if (category) {
            console.log('Filtering pets by category:', category)
            const filtered = pets.filter(pet => pet.category === category)
            setFilteredPets(filtered)
        } else {
            console.log('No category selected, showing all pets')
            setFilteredPets(pets)
        }
    }, [category, pets])

    return (
        <div className='px-5 sm:px-7 md:px-10'>
            <Hero />
            <PetList setCategory={setCategory} />
            {filteredPets.length > 0 ? (
                <Pets pets={filteredPets} />
            ) : (
                <div className="flex items-center justify-center w-full h-screen">
                    <p className="text-lg font-semibold text-gray-600">No pets available</p>
                </div>
            )}
        </div>
    )
}

'use client'
import Hero from '@/components/Adopt/Hero'
import PetList from '@/components/Adopt/PetList'
import Pets from '@/components/Adopt/Pets'
import React, { useState, useEffect } from 'react'
import app from '@/shared/FirebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

function Adopt() {
    const db = getFirestore(app)
    const [pets, setPets] = useState([]); // All pets
    const [filteredPets, setFilteredPets] = useState([]);  // For filtering pets
    const [category, setCategory] = useState('');          // For selected category

    useEffect(() => {
        getPet()
    }, []);

    const getPet = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "pets"));
            const petsData = [];
            querySnapshot.forEach((doc) => {
                petsData.push(doc.data());
            });
            console.log('Fetched pets:', petsData);  // Debugging fetched data
            setPets(petsData);
            setFilteredPets(petsData);  // Initialize filtered pets with all data
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    }

    useEffect(() => {
        if (category) {
            console.log('Filtering pets by category:', category); // Debug category
            const filtered = pets.filter(pet => pet.category === category);
            setFilteredPets(filtered);
        } else {
            console.log('No category selected, showing all pets');
            setFilteredPets(pets);  // Reset to all pets when no category is selected
        }
    }, [category, pets]);


    return (
        <div className='px-5 sm:px-7 md:px-10'>
            <Hero />
            <PetList setCategory={setCategory} />  {/* Pass setCategory to PetList */}
            {filteredPets.length > 0 ? <Pets pets={filteredPets} /> : <div className="flex items-center justify-center w-full h-screen">
            <p className="text-lg font-semibold text-gray-600">No pets available</p></div>}
        </div>
    )
}

export default Adopt;

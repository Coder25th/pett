'use client'
import React, { useEffect } from 'react'
import PetItem from './PetItem';

function Pets({ pets }) {
    useEffect(() => {
        console.log("Pets", pets);
    }, [pets]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-9">
            {pets.map((item) => (
                <PetItem key={item.id} pet={item} />
            ))}
        </div>
    )
}

export default Pets;


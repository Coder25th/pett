'use client'
import React, { useState, useEffect } from "react";
import Data from "@/shared/Data";

function PetList({ setCategory }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setPets(Data.PetList || []);
  }, []);

  const handleCategoryClick = (category) => {
    console.log('Clicked category:', category);  // Debugging category click
    setCategory(category);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-4 gap-4">
      {/* Render pet items */}
      {pets.length > 0 ? (
        pets.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick(item.category)}  // Handle category selection
          >
            <img
              src={item.image}
              width={45}
              height={45}
              alt={item.name}
              className="hover:animate-bounce transition-all duration-150"
            />
            <h2 className="text-[14px] mt-2">{item.name}</h2>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
      <p className="text-lg font-semibold text-gray-600">No pets available</p>
    </div>
      )}

      {/* "Show All Pets" button as a grid item */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setCategory('')}
      >
        {/* Placeholder image or icon for "Show All" */}
        <img
          src="/all.png"
          width={45}
          height={45}
          alt="All Pets"
          className="hover:animate-bounce transition-all duration-150"
        />
        <h2 className="text-[14px] mt-2">All Pets</h2>
      </div>
    </div>
  );
}

export default PetList;

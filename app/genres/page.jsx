"use client"

import React from 'react'
import genresList from "../../data/index"
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter()

   // Function to generate a random color
   const getRandomColor = () => {
        const letters = 'BCDEF'; // Using only light colors (B-F)
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    const handleNavigation = (item) => () => {
        router.push(`/genres/${item}`);
    };

  return (
    <div className='flex flex-col py-5'>
        <div className='flex flex-wrap gap-[calc(6%/2)] md:gap-[calc(6%/3)]'>
            {genresList?.map(({ name, id }) => (
                <div 
                    className='p-2 my-2 w-[calc(94%/3)] md:w-[calc(94%/4)] h-16 rounded-full flex justify-center items-center text-base font-medium text-pretty cursor-pointer' 
                    key={id} 
                    style={{ backgroundColor: getRandomColor() }}
                    onClick={handleNavigation(id)} // Use function reference
                   
                >
                    <p>{name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default page
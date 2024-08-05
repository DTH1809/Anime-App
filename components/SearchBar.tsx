"use client"

import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar = ({ searchTerm, setSearchTerm }) => {

    

  return (
    <div className='flex mx-3 py-3 md:px-5 md:py-5 md:max-w-[50vw] font-semibold'>
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search Anime'
            className='pl-2 w-[80vw] rounded-s-3xl border border-gray-500/30 md:text-xl'
        />
        <div className='flex justify-center items-center p-3 h-10 rounded-e-3xl border border-gray-500 bg-gray-400 cursor-pointer' >
            <CiSearch size={25} />
        </div>

    </div>
  )
}

export default SearchBar
"use client"

import { CiSearch } from "react-icons/ci";
import React, { useState } from 'react'
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaList } from "react-icons/fa";
import SearchBar from "./SearchBar";

const Navbar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    console.log(searchTerm)

  return (
    <div className='flex justify-between items-center px-4 py-3 md:px-10 bg-gray-600 bg-opacity-30'>
        <div className="flex items-center gap-5">
            <Link href="/">
                <p className="text-blue-800 font-bold md:text-2xl text-lg hover:text-black">
                    Kaku
                </p>
            </Link>
            
            <div className="flex justify-center items-center h-10 hover:bg-slate-400 rounded-lg cursor-pointer gap-2 px-2">
                <Link href={"/genres"} className="flex justify-center items-center gap-1 md:gap-2">
                    <p className="font-semibold md:text-lg">Genres</p>
                    <IoIosArrowDown />
                </Link>
            </div>
            
        </div>
        <div className='flex gap-2 md:gap-10'>       
            <div className="flex justify-center items-center h-10 w-10 hover:bg-slate-400 rounded-full cursor-pointer">
                    <Link href="/search">
                        <CiSearch size={25} />
                    </Link>
            </div>
            <div className="flex justify-center items-center h-10 w-10 hover:bg-slate-400 rounded-full cursor-pointer">
                <FaList size={20} />
            </div>
            <div className="flex justify-center items-center h-10 w-10 hover:bg-slate-400 rounded-full cursor-pointer">
                <IoPersonCircleOutline size={25} />
            </div>
            
            
        </div>
    </div>
  )
}

export default Navbar
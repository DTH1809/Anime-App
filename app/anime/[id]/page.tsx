"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchAnimeDetail } from '../../../utils/fetchFromApi';
import { FaPlay } from "react-icons/fa";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

const page = () => {

    const [animeDetail, setAnimeDetail] = useState(null)

    const animeId = useParams();
    console.log(animeId.id)

    useEffect(() => {
      fetchAnimeDetail(animeId.id).then((data) => {
        console.log(data?.data)
        setAnimeDetail(data?.data)

      })
    }, [animeId])
    
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num.toString();
    };
    
    const videoUrl = animeDetail?.trailer?.embed_url;
    console.log(videoUrl)
    
  return (
    <div className='flex flex-col hide-scrollbar'>
        <h1 className='md:text-3xl text-xl font-bold md:font-extrabold pt-5 md:px-10 px-4'>Anime Detail</h1>
        <div className='flex flex-col md:flex-row py-5 gap-3 hide-scrollbar md:px-4'>
            <div className='flex h-[80vh] md:h-[80vh] w-full hide-scrollbar'>
                <img
                    src={animeDetail?.images?.jpg?.large_image_url} 
                    alt={animeDetail?.title}
                    className='h-full w-full object-contain'
                />
            </div>
            <div className='flex flex-col justify-start px-5 gap-5 md:max-w-[70%]'>
                <div className='font-bold text-xl md:text-3xl w-full'>
                    {animeDetail?.title_english}
                </div>
                <div className='justify-start text-lg'>
                    <span className='font-semibold'>Rating : </span>
                    {animeDetail?.score + " (" + formatNumber(Number(animeDetail?.scored_by)) + ")"}
                </div>
                <div className='flex flex-wrap gap-2 justify-start items-center'>
                    {animeDetail?.genres?.map((genre, i) => (
                        <div key={i} className='flex justify-center items-center p-2 bg-gray-400 rounded-lg text-sm bg-opacity-60'>
                            {genre?.name}
                        </div>
                    ))}
                </div>
                <div className='text-start'>
                    <span className='font-semibold text-base'>Synopsis : </span>
                    {animeDetail?.synopsis}
                </div>
                <div className='flex justify-center items-center w-full cursor-pointer'>
                    <div className='bg-orange-400 p-5 flex justify-center items-center rounded-3xl'>
                        <FaPlay className='mr-4' size={30}/>
                        <p className='text-xl font-bold'>Start Watching</p>
                    </div>
                </div>
            </div>

        </div>
        <div className='flex justify-center items-center md:h-[90vh] h-[50vh] w-[90vw] max-w-4xl mx-auto my-8 rounded-lg shadow-lg'>
        {videoUrl ? (
                    <iframe
                        className='h-full w-full'
                        src={videoUrl}
                        title="Anime Trailer"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p className="text-center">Trailer not available</p>
                )}
        </div>
    </div>
  )
}

export default page
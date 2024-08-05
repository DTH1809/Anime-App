"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchGenreAnime } from '../../../utils/fetchFromApi';
import Spinner from '../../../components/Spinner';
import Link from 'next/link';
import genresList from '../../../data';

const page = () => {

    const genreId  = useParams()?
    .genre;
    const [genreAnimes, setGenreAnimes] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log(genreId)

    useEffect(() => {
      const fetchData = async () => {
        try {
            
            setLoading(true)
            await fetchGenreAnime(genreId).then((data) => {
                console.log(data)
                setGenreAnimes(data?.data)
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
      }

      fetchData();
    }, [genreId])

    
    return (
    <div>
        <h1 className='py-5 px-4 font-bold text-xl md:px-10 md:text-3xl text-center'>
            <span className='text-orange-600'>
                {genresList.find((genre) => genre.id === genreId).name}
            </span>
            {" "}Animes :
        </h1>
        <div className='flex flex-wrap w-full gap-[calc(2%/1)] md:gap-[calc(4%/3)] '>
            {loading ? <Spinner /> : (genreAnimes?.map((anime, i) => (
                <div className='flex flex-col w-[calc(98%/2)] h-[50vh] md:w-[calc(96%/4)] md:h-[80vh] ' key={i}> 
                    <Link href={`/anime/${anime.mal_id}`}>
                        <img
                            src={anime?.images?.jpg?.large_image_url}
                            alt={anime?.title}
                            className='w-full h-60 md:h-96 object-cover md:object-contain'
                        />
                        <p className='text-gray font-bold py-1 text-center text-sm md:text-lg'>{anime?.title?.length > 40 ? anime?.title?.slice(0, 40) + ".." : anime?.title}</p>
                    </Link>
                </div>
            )))}
        </div>
    </div>
  )
}

export default page
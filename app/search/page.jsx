"use client"

import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { fetchSearchAnimes } from '../../utils/fetchFromApi';
import Link from 'next/link';
import Spinner from '../../components/Spinner';


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
  const [searchTerm, setSearchTerm] = useState("");
  const [animes, setAnimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedFetchRef = useRef(null);

  const fetchAnimes = async (searchTerm) => {
    if (searchTerm) {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSearchAnimes(searchTerm.toLowerCase());
        setAnimes(data?.data || []);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    } else {
      setAnimes([]);
    }
  };

  useEffect(() => {
    debouncedFetchRef.current = debounce(fetchAnimes, 500);
  }, []);

  useEffect(() => {
    if (debouncedFetchRef.current) {
      debouncedFetchRef.current(searchTerm);
    }
  }, [searchTerm]);
  

  return (
    <div className='flex flex-col overflow-x-auto'>
        <div className='flex justify-center items-center'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className='font-semibold text-lg px-3 md:pb-5'>
          Search Results
        </div>
        <div className='flex flex-wrap h-full w-full gap-[calc(2%/2)]'>
          {loading && <Spinner/> }
          {error && <div>{error}</div>}
          {animes && (animes?.map((anime, i) => (
            <div key={i} className='flex flex-col h-[50vh] md:h-96 w-[calc(98%/2)] md:w-[calc(96%/4)] cursor-pointer'>
              <Link href={`/anime/${anime.mal_id}`}>
                <img
                  src={anime?.images?.jpg?.large_image_url} 
                  alt={anime?.title} 
                  className='w-full h-60 md:h-80 object-cover md:object-contain'
                />
                <p className='text-gray font-bold pt-2 text-center text-xs md:text-lg'>{anime?.title?.length > 40 ? anime?.title?.slice(0, 40) + ".." : anime?.title}</p>
              </Link>
            </div>
          )))}
        </div>
    </div>
  )

}

export default page
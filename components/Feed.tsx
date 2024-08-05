"use client";

import { fetchFromApiSeasonAnime, fetchFromApiTopAnime } from '../utils/fetchFromApi';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Link from 'next/link';
import Spinner from './Spinner';

const Feed = () => {
    const [animes, setAnimes] = useState([]);
    const containerTopAnimesRef = useRef(null);
    const containerSeasonAnimesRef = useRef(null)
    const [seasonAnimes, setSeasonAnimes] = useState([])
    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingSeason, setLoadingSeason] = useState(false)

    const handlers = useSwipeable({
        onSwipedLeft: () => handleScroll('right'),
        onSwipedRight: () => handleScroll('left'),
        onSwipedUp: () => console.log("Swiped up!"),
        onSwipedDown: () => console.log("Swiped down!"),
        onTouchStartOrOnMouseDown: (event) => console.log("Swipe started", event),
        onTouchEndOrOnMouseUp: (event) => console.log("Swipe ended", event),
    });

    useEffect(() => {

        const fetchTopAnimes = async() => {
            setLoadingTop(true)
            try {
                await fetchFromApiTopAnime().then((data) => {
                    setAnimes(data?.data)
                }) 
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingTop(false)
            }
        }

        const fetchSeasonAnimes = async() => {
            setLoadingSeason(true)
            try {
                await fetchFromApiSeasonAnime().then((data) => {
                    setSeasonAnimes(data?.data)
                }) 
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSeason(false)
            }
        }

        fetchTopAnimes();
        setTimeout(fetchSeasonAnimes, 2000)

    }, []);

    const handleScrollTopAnimes = (direction) => {
        if (containerTopAnimesRef?.current) {
            console.log(`Scrolling ${direction}`);
            const { scrollLeft, clientWidth, scrollWidth } = containerTopAnimesRef.current;
            const scrollTo = direction === 'left'
                ? Math.max(scrollLeft - clientWidth, 0)
                : Math.min(scrollLeft + clientWidth, scrollWidth - clientWidth);

            containerTopAnimesRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            console.log(`Scrolled to: ${scrollTo}`);
        } else {
            console.error('containerRef is not set');
        }
    };

    const handleScrollSeasonAnimes = (direction) => {
        if (containerSeasonAnimesRef?.current) {
            console.log(`Scrolling ${direction}`);
            const { scrollLeft, clientWidth, scrollWidth } = containerSeasonAnimesRef.current;
            const scrollTo = direction === 'left'
                ? Math.max(scrollLeft - clientWidth, 0)
                : Math.min(scrollLeft + clientWidth, scrollWidth - clientWidth);

            containerSeasonAnimesRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            console.log(`Scrolled to: ${scrollTo}`);
        } else {
            console.error('containerRef is not set');
        }
    }

    return (
        <>
        {/* Top Animes */}
        <div className='mt-10 px-5'>
            <h1 className='font-bold text-3xl mb-5 pl-7'>Top Animes</h1>
            <div className='relative flex items-center justify-center w-full h-full'>
                {/* Left Button */}
                <div 
                    className='absolute left-1 top-[42%] transform -translate-y-1/2 cursor-pointer h-8 w-8 hidden sm:flex justify-center items-center opacity-70 z-10 bg-gray-400 rounded-full'
                    onClick={() => handleScrollTopAnimes('left')}
                >
                    <MdNavigateBefore size={30} />
                </div>

                {/* Scrollable Container */}
                <div 
                    className='flex overflow-x-auto hide-scrollbar h-full w-full md:gap-[calc(4%/3)] overflow-hidden gap-[calc(2%/1)]'
                    {...handlers}
                    ref={containerTopAnimesRef}
                >
                    {loadingTop ? (
                        <Spinner />
                    ) : (
                    animes?.map((anime, i) => (
                        <div key={i} className='relative h-64 w-[calc(98%/2)] flex-shrink-0 md:h-[72vh] md:w-[calc(96%/4)] cursor-pointer'>
                                <Link href={`/anime/${anime.mal_id}`}>
                                    <img 
                                        src={anime?.images?.webp?.large_image_url} 
                                        alt={anime.mal_id}
                                        className='w-full h-[85%] object-contain'
                                    />
                                    <p className='text-gray font-bold py-1 text-center text-xs md:text-lg'>{anime?.title}</p>
                                </Link>
                        </div>
                        
                    )))}
                </div>

                {/* Right Button */}
                <div 
                    className='absolute right-1 top-[42%] transform -translate-y-1/2 cursor-pointer bg-gray-400 h-8 w-8 justify-center items-center opacity-70 z-10 rounded-full hidden sm:flex'
                    onClick={() => handleScrollTopAnimes('right')}
                >
                    <MdNavigateNext size={30} />
                </div>
            </div>
        </div>

        {/* Season Animes */}
        <div className='mt-10 px-5'>
        <h1 className='font-bold text-3xl mb-5 pl-7'>Season Animes</h1>
        <div className='relative flex items-center justify-center w-full h-full'>
            {/* Left Button */}
            <div 
                className='absolute left-1 top-[42%] transform -translate-y-1/2 cursor-pointer h-8 w-8 hidden sm:flex justify-center items-center opacity-70 z-10 bg-gray-400 rounded-full'
                onClick={() => handleScrollSeasonAnimes('left')}
            >
                <MdNavigateBefore size={30} />
            </div>

            {/* Scrollable Container */}
            <div 
                className='flex overflow-x-auto hide-scrollbar h-full w-full md:gap-[calc(4%/3)] overflow-hidden gap-[calc(2%/1)]'
                {...handlers}
                ref={containerSeasonAnimesRef}
            >
                {loadingSeason ? (<Spinner />) : (seasonAnimes?.map((anime, i) => (
                    <div key={i} className='relative h-64 w-[calc(98%/2)] flex-shrink-0 md:h-[72vh] md:w-[calc(96%/4)] cursor-pointer'>
                        <Link href={`/anime/${anime.mal_id}`}>
                            <img 
                                src={anime?.images?.webp?.large_image_url} 
                                alt={anime.mal_id}
                                className='w-full h-[85%] object-contain'
                            />
                            <p className='text-gray font-bold py-1 text-center text-xs md:text-lg'>{anime?.title?.length > 40 ? anime?.title?.slice(0, 40) + ".." : anime?.title}</p>
                        </Link>
                    </div>
                )))}
            </div>

            {/* Right Button */}
            <div 
                className='absolute right-1 top-[42%] transform -translate-y-1/2 cursor-pointer bg-gray-400 h-8 w-8 justify-center items-center opacity-70 z-10 rounded-full hidden sm:flex'
                onClick={() => handleScrollSeasonAnimes('right')}
            >
                <MdNavigateNext size={30} />
            </div>
        </div>
    </div>
    </>
    );
};

export default Feed;

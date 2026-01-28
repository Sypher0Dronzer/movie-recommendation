import React from 'react'
import { Movie, SimilarMovie } from '../../../types';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

const MoviePoster = ({
  index,
  similarityRating,
  movie,
}: {
  index?: number;
  similarityRating?: number;
  movie: Movie | SimilarMovie;
}) => {
  return (
    <Link key={movie.id} href={`/movie/${movie.id}`} className="sm:w-52 w-36 ">
      <div className="relative  sm:w-52 w-36 h-56 sm:h-72 overflow-hidden rounded-md drop-shadow-[2px_2px_2px_rgba(255,255,255,0.4)] flex-none object-contain ">
        <ImageWithFallback
          className="w-full h-full rounded-md"
          src={movie.Poster}
          alt={movie.Title}
          id={movie.id}
        />

        {similarityRating && (
          <div className="absolute size-12 shadow-white shadow-sm flex items-center justify-center bottom-0 right-0 bg-red-700 bg-opacity-90 p-2 rounded-full m-5 font-bold">
            {similarityRating}%
          </div>
        )}

        {/* {index && ( 
          <div className="absolute text-gray-100 top-32 -left-10 text-9xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {index}
          </div>
        )} */}
      </div>

      <div className="py-2">
        <p className=" font-semibold line-clamp-1 w-full">{movie.Title}</p>
        <p className="text-gray-500 line-clamp-1 text-sm">{movie.Genre}</p>
      </div>
    </Link>
  )
}

export default MoviePoster

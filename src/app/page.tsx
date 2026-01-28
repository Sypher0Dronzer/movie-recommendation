import React from 'react'
import MoviePoster from './components/MoviePoster';
import { Movie } from '../../types';
import { prisma } from '../../lib/prisma';

const page = async() => {
  const allMovies:Movie[] =  await prisma.movies_data.findMany()

  return (
    <div>
    <div className="flex items-center justify-center pb-24 pt-4  px-4 max-w-6xl mx-auto">

      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> */}
      <div className="flex  flex-wrap gap-4 justify-center w-full">
        {allMovies.map((movie) => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default page

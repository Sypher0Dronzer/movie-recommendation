import { cache } from "react";
import { prisma } from "../../../lib/prisma";
import MoviePoster from "./MoviePoster";
import { Movie } from "../../../types";
import { getMovies } from "../actions/getMovies";
import InfiniteMovies from "./InfiniteMovies";

export const MoviesGrid = async () => {
//   const getMovies = cache(async () => {
//     return prisma.movies_data.findMany({
//       select: {
//         Poster: true,
//         Title: true,
//         Genre: true,
//         id: true,
//       },
//     });
//   });
  //   const movies = await prisma.movies_data.findMany();
//   const movies: PosterMovie[] | [] = await getMovies();

//   if (!movies.length) {
//     return <div>No movies found</div>;
//   }
//   console.log(movies[0]);

 const initialMovies = await getMovies();

  return (
    <div className="flex flex-wrap gap-4 justify-center w-full">
      {/* {movies.map((movie) => (
        <MoviePoster key={movie.id} movie={movie} />
      ))} */}

      <InfiniteMovies initialMovies={initialMovies} />
    </div>
  );
};

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import MoviePoster from "@/app/components/MoviePoster";
import { prisma } from "../../../../lib/prisma";
import SimilarMoviesSlider from "@/app/components/SimilarMoviesSlider";
import { SimilarMovie } from "../../../../types";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let movie;
  try {
    movie = await prisma.movies_data.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return notFound();
  }

  const data = await prisma.$runCommandRaw({
    aggregate: "movies_data",
    pipeline: [
      {
        $vectorSearch: {
          index: "PlotSementicSearch", // Use the vector search index you created
          path: "vector",
          queryVector: movie?.vector,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $addFields: {
          id: { $toString: "$_id" },
          similarityScore: { $meta: "vectorSearchScore" },
        },
      },
    ],
    cursor: {},
  });
  // @ts-ignore
  const similarMovies = data?.cursor?.firstBatch as SimilarMovie[];
  // @ts-ignore
  similarMovies.shift();

  return (
    <div className="max-w-6xl  mx-auto sm:px-8 px-4 pb-8">
      {movie && (
        <div className="flex flex-col md:flex-row items-center gap-10 py-10 pb-0">
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            height={450}
            className="sm:max-h-[530px] h-[300px] w-auto rounded-md"
          />
          <div className="px-4  flex flex-col flex-1 gap-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold text-balance">
              {movie.Title}
            </h1>
            <p className="text-gray-600">{movie.Genre}</p>

           

            <div className="space-y-1 text-sm text-gray-200">
  <p><span className="font-semibold text-gray-400">Directed by:</span> {movie.Director}</p>
  <p><span className="font-semibold text-gray-400">Featuring:</span> {movie.Actors}</p>
  <p><span className="font-semibold text-gray-400">Box Office:</span> {movie.BoxOffice}</p>
  <p><span className="font-semibold text-gray-400">Released:</span> {movie.Released}</p>
  <p><span className="font-semibold text-gray-400">Runtime:</span> {movie.Runtime}</p>
  <p><span className="font-semibold text-gray-400">Rated:</span> {movie.Rated}</p>
  <p><span className="font-semibold text-gray-400">IMDb:</span> {movie.imdbRating}</p>
  <p><span className="font-semibold text-gray-400">Language:</span> {movie.Language}</p>
  <p><span className="font-semibold text-gray-400">Country:</span> {movie.Country}</p>
</div>



          </div>
        </div>
      )}

      <div className="relative  ">
        <h2 className="sm:text-3xl text-xl pt-10 pb-6 font-bold ">
          Similar Films you may like
        </h2>
        
        <SimilarMoviesSlider movies={similarMovies} />
      </div>
    </div>
  );
};

export default page;

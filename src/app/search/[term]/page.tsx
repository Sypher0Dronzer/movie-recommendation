// @ts-nocheck

import MoviePoster from "@/app/components/MoviePoster";
import { SimilarMovie } from "../../../../types";
import { getEmbeddings } from "../../../../utils/genEmbeddings";
import { prisma } from "../../../../lib/prisma";

// refresh cache every 24 hours
export const revalidate = 60 * 60 * 24;

async function SearchTerm({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  //  first make embeddings for the search Query
  const query_embedding = await getEmbeddings(term);

  const data = await prisma.$runCommandRaw({
    aggregate: "movies_data",
    pipeline: [
      {
        $vectorSearch: {
          index: "PlotSementicSearch", // Use the vector search index you created
          path: "vector",
          queryVector: query_embedding,
          numCandidates: 100,
          limit: 15,
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

  const movies = data?.cursor?.firstBatch as SimilarMovie[];

  return (
    <div className="flex flex-col items-center justify-center mx-auto pb-24   px-4 max-w-6xl">
      <h1 className="mb-4 text-xl text-gray-100">
        Suggested results based on your search
      </h1>

      <div className="flex  flex-wrap gap-4 justify-center w-full">
        {movies.map((movie, i) => (
          <div className="flex space-x-2 relative" key={movie.id}>
            {/* <p className="absolute flex items-center justify-center left-4 top-2 text-white font-extrabold text-xl z-40 rounded-full bg-indigo-500/80 w-10 h-10">
              {i + 1}
            </p> */}

            <MoviePoster
              key={movie.id}
              movie={movie}
              similarityRating={Math.round(movie.similarityScore * 100)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchTerm;

'use client';

import { useRef } from "react";
import MoviePoster from "@/app/components/MoviePoster";
import { SimilarMovie } from "../../../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SimilarMoviesSlider({
  movies,
}: {
  movies: SimilarMovie[];
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex overflow-x-scroll group  scrollbar-hide gap-4 pb-4" ref={sliderRef}>
      {movies.map((movie, i) => (
        <MoviePoster
          key={movie.id}
          index={i + 1}
          similarityRating={Math.round(movie.similarityScore * 100)}
          movie={movie}
        />
      ))}

      <ChevronRight
                className="hidden sm:block absolute shadow-white shadow-md top-1/2  right-2 size-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="hidden sm:block absolute shadow-white shadow-md top-1/2 left-2 size-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
    </div>
  );
}

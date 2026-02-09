'use client';

import { useState, useRef, useCallback } from 'react';
import MoviePoster from './MoviePoster';
import { getMovies } from '../actions/getMovies';
import { PosterMovie } from '../../../types';


interface InfiniteMoviesProps {
  initialMovies: PosterMovie[];
}
export default function InfiniteMovies({ initialMovies }:InfiniteMoviesProps) {
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback( (node: HTMLDivElement | null)  => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true);

        const lastId = movies[movies.length - 1]?.id;
        const newMovies = await getMovies(lastId);

        setMovies((prev) => [...prev, ...newMovies]);
        setHasMore(newMovies.length > 0);
        setLoading(false);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, movies]);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
                <MoviePoster movie={movie} />
              </div>
            );
          }

          return <MoviePoster key={movie.id} movie={movie} />;
        })}
      </div>

      {loading && <p className="text-center mt-8">Loading more...</p>}
      {!hasMore && <p className="text-center mt-8 text-gray-500">No more movies</p>}
    </>
  );
}

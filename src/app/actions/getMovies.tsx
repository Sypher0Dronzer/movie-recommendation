'use server';

import { prisma } from "../../../lib/prisma";


const PAGE_SIZE = 24;

export async function getMovies(cursor?: string) {
  const movies = await prisma.movies_data.findMany({
    take: PAGE_SIZE,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    select: {
        Poster: true,
        Title: true,
        Genre: true,
        id: true,
      },
    orderBy: { id: 'desc' },
  });

  return movies;
}

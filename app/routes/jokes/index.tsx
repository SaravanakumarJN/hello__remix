import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  return { randomJoke };
};

export default function JokesIndexRoute() {
  const { randomJoke } = useLoaderData();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{randomJoke.content}</p>
    </div>
  );
}

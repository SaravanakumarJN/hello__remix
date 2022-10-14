import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async (pageContext) => {
  const { params } = pageContext;
  const joke = await db.joke.findUnique({ where: { id: params.jokesId } });
  return { joke };
};

export default function JokeRoute() {
  const { joke } = useLoaderData();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
    </div>
  );
}

import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { Outlet, Link, useLoaderData } from '@remix-run/react';
import stylesUrl from '~/styles/jokes.css';
import { db } from '~/utils/db.server';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const loader: LoaderFunction = async () => {
  const jokes = await db.joke.findMany();
  const data = { jokes };
  return data;
};

export default function JokesRoute() {
  const { jokes } = useLoaderData();

  return (
    <div className='jokes-layout'>
      <header className='jokes-header'>
        <div className='container'>
          <h1 className='home-link'>
            <Link to='/' title='Remix Jokes' aria-label='Remix Jokes'>
              <span className='logo'>🤪</span>
              <span className='logo-medium'>J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className='jokes-main'>
        <div className='container'>
          <div className='jokes-list'>
            <Link to='.'>Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            {jokes?.map((ele) => {
              return (
                <ul key={ele.id}>
                  <li>
                    <Link to={ele.id}>{ele.name}</Link>
                  </li>
                </ul>
              );
            })}
            <Link to='new' className='button'>
              Add your own
            </Link>
          </div>
          <div className='jokes-outlet'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

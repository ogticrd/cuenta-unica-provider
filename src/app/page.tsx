'use client';

import { useCallback, useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { Session } from '@ory/client';

import { useRouter } from 'next/navigation';
import { ory } from '@/lib/sdk';

export default function Home() {
  const [session, setSession] = useState<Session>();
  const router = useRouter();

  const handleError = useCallback(
    (error: AxiosError) => {
      // const handle = HandleError(undefined, undefined, '/login');
      // return handle(error);
      console.error(error);
      return router.push('/login');
    },
    [router],
  );

  useEffect(() => {
    // If the router is not ready yet, or we already have a session, do nothing.
    ory
      .toSession()
      .then(({ data: session }) => {
        // we set the session data which contains the user Identifier and other traits.
        setSession(session);
      })
      .catch(handleError)
      .catch((error) => {
        // Handle all other errors like error.message "network error" if Kratos can not be connected etc.
        if (error.message) {
          return router.push(
            `/error?error=${encodeURIComponent(error.message)}`,
          );
        }

        // Just stringify error and print all data
        return router.push(
          `/error?error=${encodeURIComponent(JSON.stringify(error))}`,
        );
      });
  }, [handleError]);

  return session ? (
    <div className="px-8">
      <main className="pt-24 md:pl-24 md:pt-16">
        <header className="flex flex-col items-center justify-center gap-2">
          <h1 className="m-0 text-center text-5xl text-blue-950 md:text-7xl">
            Bienvenido a{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-700"
            >
              Cuenta única
            </a>
          </h1>
          <h2 className="scale-90">
            <span className="text-xl text-gray-500">hecho con </span>
            <a
              href="https://github.com/ory/elements"
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold text-blue-700"
            >
              Ory Elements
            </a>
          </h2>
        </header>

        <h3 className="mt-16 text-xl md:text-2xl">Información de la sesión</h3>
        <div className="dark mt-3 flex h-[45vh] max-w-[95vw] overflow-y-auto rounded-lg border border-zinc-200 bg-gray-100 dark:border-gray-700 dark:bg-[#22272e] md:h-[70vh] md:max-w-[45vw]">
          <pre className="p-5 text-gray-700 dark:text-gray-300">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

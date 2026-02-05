'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <main className="container mx-auto flex flex-col items-center justify-center h-screen gap-4">
          <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            An unexpected error occurred. This might be a temporary issue or a
            problem with the website.
          </p>
          <Button onClick={() => reset()}>Try again</Button>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            Go back to home
          </Link>
          <pre className="mt-4 p-2 bg-gray-100 text-red-600 rounded">
            {error.message}
          </pre>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZI PREMIUM SHOP - Premium Digital Services',
  description: 'Premium Digital Services at unbeatable prices',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="monetag" content="4d882b8f08c56bf6332e21050660a04d"></meta>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

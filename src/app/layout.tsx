import { about, contact } from '@/assets/content';
import { Providers } from '@/hocs/Providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: `${contact.name} | ${contact.designation}`,
    template: `%s | ${contact.name}`,
  },
  description: about.meta,
  keywords: [
    'Full-Stack Developer',
    'Full-Stack Engineer',
    'Developer',
    'Engineer',
    'React',
    'React Native',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'AWS',
  ],
  authors: [{ name: contact.name }],
  creator: contact.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sivantha.com',
    siteName: `${contact.name} Portfolio`,
    title: `${contact.name} | ${contact.designation}`,
    description: about.meta,
    images: [
      {
        url: 'https://www.sivantha.com/og-image.png',
        width: 1200,
        height: 630,
        alt: `${contact.name} - ${contact.designation}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${contact.name} | ${contact.designation}`,
    description: about.meta,
    images: ['https://www.sivantha.com/og-image.png'],
    creator: '@sivantha96',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    yandex: '59ed34414b3f805b',
    other: {
      me: [
        `mailto:${contact.email.personal}`,
        contact.social.github,
        contact.social.linkedin,
        contact.social.dev,
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='canonical' href='https://sivantha.com' />
        <link
          rel='icon'
          type='image/png'
          href='favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='favicon.svg' />
        <link rel='shortcut icon' href='favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='Sivantha' />
        <link rel='manifest' href='site.webmanifest' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

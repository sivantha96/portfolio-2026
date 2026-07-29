import { about, contact } from '@/assets/content';
import { Providers } from '@/hocs/Providers';
import type { Metadata } from 'next';
import { DM_Mono, DM_Sans, Lora } from 'next/font/google';
import React from 'react';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const BASE_URL = 'https://www.sivantha.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${contact.name} | ${contact.designation}`,
    template: `%s | ${contact.name}`,
  },
  description: about.meta,
  keywords: [
    'Sivantha Paranavithana',
    'Associate Tech Lead',
    'Tech Lead',
    'Engineering Manager',
    'Senior Engineering Lead',
    'AI Engineering',
    'AI-Assisted Development',
    'LLM Integration',
    'OpenRouter',
    'Full-Stack Engineer',
    'Full-Stack Developer',
    'Software Engineer',
    'React',
    'React Native',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'AWS',
    'AWS CDK',
    'ECS Fargate',
    'Microservices',
    'Cloud Architecture',
    'Payment Systems',
    'Adyen',
    'Stripe',
    'Sri Lanka',
    'Remote Engineer',
    'Team Leadership',
    'DevOps',
    'CI/CD',
    'Dinetap',
  ],
  authors: [{ name: contact.name, url: contact.social.linkedin }],
  creator: contact.name,
  publisher: contact.name,
  category: 'technology',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'profile',
    firstName: 'Sivantha',
    lastName: 'Paranavithana',
    username: 'sivantha96',
    locale: 'en_US',
    url: BASE_URL,
    siteName: `${contact.name} | Portfolio`,
    title: `${contact.name} | ${contact.designation}`,
    description: about.meta,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${contact.name} | ${contact.designation}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sivantha96',
    creator: '@sivantha96',
    title: `${contact.name} | ${contact.designation}`,
    description: about.meta,
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.add(theme === 'system' ? systemTheme : theme);
                const color = localStorage.getItem('color');
                if (color) document.documentElement.classList.add('theme-' + color);
              })();
            `,
          }}
        />
        <link rel='canonical' href={BASE_URL} />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-16x16.png'
          sizes='16x16'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='Sivantha' />
        <meta name='application-name' content='Sivantha Paranavithana' />
        <meta name='theme-color' content='#0A0A0A' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body
        className={`${dmSans.variable} ${lora.variable} ${dmMono.variable} antialiased`}
        suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

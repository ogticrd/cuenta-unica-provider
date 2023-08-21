'use client';

import './globals.css';

// optional global css reset
import '@ory/elements/assets/normalize.css';

// optional fontawesome icons
import '@ory/elements/assets/fa-brands.min.css';
import '@ory/elements/assets/fa-solid.min.css';
import '@ory/elements/assets/fontawesome.min.css';

// optional fonts
import '@ory/elements/assets/inter-font.css';
import '@ory/elements/assets/jetbrains-mono-font.css';

// required styles for Ory Elements
import '@ory/elements/style.css';

import { Nav, ThemeProvider } from '@ory/elements';
import Head from 'next/head';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Next.js w/ Elements</title>
        <link rel="icon" href="/ory.svg" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider themeOverrides={{}}>
          <Nav
            className="main-nav"
            navTitle="Next.js w/ Elements"
            navSections={[
              {
                title: 'Navigation',
                links: [
                  {
                    name: 'Home',
                    href: '/',
                  },
                  {
                    name: 'Login',
                    href: '/login',
                  },
                  {
                    name: 'Register',
                    href: '/registration',
                  },
                  {
                    name: 'Settings',
                    href: '/settings',
                  },
                  {
                    name: 'Verification',
                    href: '/verification',
                  },
                  {
                    name: 'Recovery',
                    href: '/recovery',
                  },
                  {
                    name: 'Logout',
                    href: '/logout',
                  },
                ],
              },
            ]}
          />
          <section className="contentContainer">
            <div className="content">{children}</div>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

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

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>Cuenta única</title>
        <link rel="icon" href="/ory.svg" />
      </head>

      <body className={inter.className}>
        <ThemeProvider themeOverrides={{}}>
          <Nav
            // main-nav
            className="fixed left-0 top-0 z-10 w-64 !pt-8"
            navTitle="Cuenta única"
            navSections={[
              {
                title: 'Holi',
                links: [
                  {
                    name: 'Home',
                    href: '/',
                  },
                  {
                    name: 'Iniciar sesión',
                    href: '/login',
                  },
                  {
                    name: 'Registrarse',
                    href: '/registration',
                  },
                  {
                    name: 'Ajustes',
                    href: '/settings',
                  },
                  {
                    name: 'Verificación',
                    href: '/verification',
                  },
                  {
                    name: 'Recovery',
                    href: '/recovery',
                  },
                  {
                    name: 'Cerrar sesión',
                    href: '/logout',
                  },
                ],
              },
            ]}
          />
          <section className="md:w-[calc(100vw-16rem)] md:pl-[12em]">
            {children}
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}

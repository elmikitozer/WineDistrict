// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavbarServer from '../components/NavbarServer';
import { CartProvider } from '../contexts/CartContext';
import ScrollRestoration from '../components/ScrollRestoration';
import { Toaster } from 'react-hot-toast';
import GoogleAnalytics from './components/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wine District',
  description: 'Trouvez votre vin préféré chez un caviste près de chez vous',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        {GA_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_ID} />}
        <CartProvider>
          <ScrollRestoration />
          <Toaster position="bottom-right" />
          {/* Navbar renders session-aware via server wrapper */}
          <NavbarServer />
          <main className="min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

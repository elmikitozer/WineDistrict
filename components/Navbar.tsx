// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

function Brand() {
  return (
    <Link href="/" className="flex-shrink-0 text-xl font-bold hover:text-black">
      Wine District
    </Link>
  );
}

function DesktopLinks({ isAuthenticated }: { isAuthenticated?: boolean }) {
  return (
    <div className="hidden md:flex space-x-6 font-medium">
      <Link href="/vins" className="hover:text-black">
        Vins
      </Link>
      <Link href="/cavistes" className="hover:text-black">
        Cavistes
      </Link>
      {isAuthenticated ? (
        <>
          <Link href="/dashboard" className="hover:text-black">
            Dashboard
          </Link>
          <form action="/api/auth/logout" method="post">
            <button className="hover:text-black">Déconnexion</button>
          </form>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login" className="hover:text-black">
            Connexion
          </Link>
          <div className="inline-flex items-center gap-2">
            <Link href="/signup" className="hover:text-black">
              S&apos;inscrire
            </Link>
            {process.env.NODE_ENV !== 'production' && (
              <>
                <span className="text-rose-400">·</span>
                <Link href="/signup-caviste" className="hover:text-black">
                  Caviste (dev)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchCenter() {
  return (
    <div className="hidden md:flex flex-1 justify-center">
      <SearchBar />
    </div>
  );
}

function MobileMenu({
  onClose,
  isAuthenticated,
}: {
  onClose: () => void;
  isAuthenticated?: boolean;
}) {
  return (
    <div id="mobile-menu" className="md:hidden px-4 pb-4 pt-2 space-y-3 font-medium relative z-50">
      <div className="pt-1">
        <SearchBar />
      </div>
      <Link href="/vins" className="block hover:text-black" onClick={onClose}>
        Vins
      </Link>
      <Link href="/cavistes" className="block hover:text-black" onClick={onClose}>
        Cavistes
      </Link>
      {isAuthenticated ? (
        <>
          <Link href="/dashboard" className="block hover:text-black" onClick={onClose}>
            Dashboard
          </Link>
          <form
            action="/api/auth/logout"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
              (e.currentTarget as HTMLFormElement).submit();
            }}
          >
            <button className="block hover:text-black">Déconnexion</button>
          </form>
        </>
      ) : (
        <div className="space-y-2">
          <Link href="/login" className="block hover:text-black" onClick={onClose}>
            Connexion
          </Link>
          <Link href="/signup" className="block hover:text-black" onClick={onClose}>
            S&apos;inscrire
          </Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link href="/signup-caviste" className="block hover:text-black" onClick={onClose}>
              S&apos;inscrire (Caviste - dev)
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

type NavbarProps = { isAuthenticated?: boolean };

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="bg-rose-100 text-rose-800 border-b border-rose-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Brand />
          <SearchCenter />
          <DesktopLinks isAuthenticated={isAuthenticated} />
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Ouvrir/fermer le menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} isAuthenticated={isAuthenticated} />}
    </nav>
  );
}

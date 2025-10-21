// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

function Brand() {
  return (
    <Link href="/" className="flex-shrink-0 text-xl font-bold hover:text-black">
      Wine District
    </Link>
  );
}

function DesktopLinks({
  isAuthenticated,
  isCaviste,
}: {
  isAuthenticated?: boolean;
  isCaviste?: boolean;
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="hidden md:flex space-x-6 font-medium items-center">
      <Link href="/vins" className="hover:text-black">
        Vins
      </Link>
      <Link href="/cavistes" className="hover:text-black">
        Cavistes
      </Link>
      {isAuthenticated ? (
        <>
          <CartIcon />

          {/* Menu déroulant Mon compte */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Mon compte</span>
              <svg
                className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-rose-50 transition"
                    onClick={() => setShowUserMenu(false)}
                  >
                    📦 Mes commandes
                  </Link>
                  {!isCaviste && (
                    <Link
                      href="/favoris"
                      className="block px-4 py-2 hover:bg-rose-50 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      ⭐ Mes cavistes favoris
                    </Link>
                  )}
                  <hr className="my-2 border-gray-200" />
                  <form action="/api/auth/logout" method="post">
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 transition text-red-600"
                    >
                      🚪 Déconnexion
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
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
  isCaviste,
}: {
  onClose: () => void;
  isAuthenticated?: boolean;
  isCaviste?: boolean;
}) {
  return (
    <div id="mobile-menu" className="md:hidden bg-rose-50 border-t border-rose-200">
      {/* Barre de recherche */}
      <div className="px-4 py-3 bg-white border-b border-rose-100">
        <SearchBar />
      </div>

      {/* Navigation principale */}
      <div className="px-4 py-3 space-y-1">
        <Link
          href="/vins"
          className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium"
          onClick={onClose}
        >
          🍷 Vins
        </Link>
        <Link
          href="/cavistes"
          className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium"
          onClick={onClose}
        >
          🏪 Cavistes
        </Link>
      </div>

      {isAuthenticated ? (
        <>
          {/* Mon compte */}
          <div className="px-4 py-3 border-t border-rose-200 space-y-1">
            <div className="px-4 pb-2 text-xs font-semibold text-rose-600 uppercase tracking-wide">
              Mon compte
            </div>
            <Link
              href="/dashboard"
              className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium"
              onClick={onClose}
            >
              📦 Mes commandes
            </Link>
            {!isCaviste && (
              <Link
                href="/favoris"
                className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium"
                onClick={onClose}
              >
                ⭐ Mes cavistes favoris
              </Link>
            )}
          </div>

          {/* Déconnexion */}
          <div className="px-4 py-3 border-t border-rose-200">
            <form
              action="/api/auth/logout"
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
                (e.currentTarget as HTMLFormElement).submit();
              }}
            >
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 transition font-medium text-red-600">
                🚪 Déconnexion
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="px-4 py-3 border-t border-rose-200 space-y-1">
          <Link
            href="/login"
            className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium"
            onClick={onClose}
          >
            🔑 Connexion
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition font-medium text-center"
            onClick={onClose}
          >
            ✨ S&apos;inscrire
          </Link>
          {process.env.NODE_ENV !== 'production' && (
            <Link
              href="/signup-caviste"
              className="block px-4 py-3 rounded-lg hover:bg-rose-100 transition font-medium text-sm text-gray-600"
              onClick={onClose}
            >
              S&apos;inscrire (Caviste - dev)
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

type NavbarProps = { isAuthenticated?: boolean; isCaviste?: boolean };

export default function Navbar({ isAuthenticated, isCaviste }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="bg-rose-100 text-rose-800 border-b border-rose-200 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Brand />
          <SearchCenter />
          <DesktopLinks isAuthenticated={isAuthenticated} isCaviste={isCaviste} />
          
          {/* Mobile: Panier + Burger */}
          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated && <CartIcon />}
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
      {isOpen && (
        <MobileMenu
          onClose={() => setIsOpen(false)}
          isAuthenticated={isAuthenticated}
          isCaviste={isCaviste}
        />
      )}
    </nav>
  );
}

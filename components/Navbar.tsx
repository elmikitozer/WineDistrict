"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-rose-100 text-rose-800 border-b border-rose-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold hover:text-black"
          >
            Wine District
          </Link>

          {/* ✅ Barre de recherche }
          <form action="/vins" method="get" className="flex-1 px-6">
            <input
              type="text"
              name="q"
              placeholder="Rechercher un vin..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </form>*/}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          <div className="hidden md:flex space-x-6 font-medium">
            {/* <Link href="/" className="hover:text-black">Accueil</Link> */}
            <Link href="/vins" className="hover:text-black">
              Vins
            </Link>
            {/* <Link href="/cavistes" className="hover:text-black">
              Cavistes
            </Link> */}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 font-medium">
          {/* <Link href="/" className="block hover:text-black" onClick={() => setIsOpen(false)}>Accueil</Link> */}
          <Link
            href="/vins"
            className="block hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            Vins
          </Link>
          <Link
            href="/cavistes"
            className="block hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            Cavistes
          </Link>
        </div>
      )}
    </nav>
  );
}

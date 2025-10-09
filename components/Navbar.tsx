// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

function Brand() {
  return (
    <Link href="/" className="flex-shrink-0 text-xl font-bold hover:text-black">
      Wine District
    </Link>
  );
}

function DesktopLinks() {
  return (
    <div className="hidden md:flex space-x-6 font-medium">
      <Link href="/vins" className="hover:text-black">Vins</Link>
      <Link href="/cavistes" className="hover:text-black">Cavistes</Link>
      <Link href="/dashboard" className="hover:text-black">Dashboard</Link>
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

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div id="mobile-menu" className="md:hidden px-4 pb-4 pt-2 space-y-3 font-medium relative z-50">
      <div className="pt-1">
        <SearchBar />
      </div>
      <Link href="/vins" className="block hover:text-black" onClick={onClose}>Vins</Link>
      <Link href="/cavistes" className="block hover:text-black" onClick={onClose}>Cavistes</Link>
      <Link href="/dashboard" className="block hover:text-black" onClick={onClose}>Dashboard</Link>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="bg-rose-100 text-rose-800 border-b border-rose-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Brand />
          <SearchCenter />
          <DesktopLinks />
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
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </nav>
  );
}

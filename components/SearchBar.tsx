// app/components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Vin = {
  id: number;
  nom: string;
  domaine: string;
  // TIP: évite les accents dans les clés TS/DB: annee: number;
  année: number;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Vin[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 1) {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => setResults(data))
          .catch(() => setResults([]));
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/vins?q=${encodeURIComponent(trimmed)}` : "/");
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative" role="search" aria-label="Recherche de vins">
        <input
          type="text"
          placeholder="Rechercher un vin (ex. Chinon, Margaux...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm placeholder:text-gray-400"
          inputMode="search"
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
          aria-label="Lancer la recherche"
        >
          <Search size={18} />
        </button>
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 z-[60] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((vin) => (
            <li
              key={vin.id}
              onClick={() => {
                router.push(`/vins/${vin.id}`);
                setShowDropdown(false);
              }}
              className="px-4 py-2 text-sm hover:bg-rose-50 cursor-pointer transition-colors duration-150"
            >
              <span className="font-medium text-gray-800">{vin.nom}</span>{" "}
              <span className="text-gray-500">({vin.domaine})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react'; // icône si tu as lucide installé

type Vin = {
  id: number;
  nom: string;
  domaine: string;
  année: number;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Vin[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push('/');
    } else {
      router.push(`/vins?q=${encodeURIComponent(trimmed)}`);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Rechercher un vin (ex. Chinon, Margaux...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 text-sm placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
        >
          <Search size={18} />
        </button>
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
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

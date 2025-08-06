'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    }, 300); // délai pour éviter trop de requêtes

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/vins?q=${encodeURIComponent(query)}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher un vin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-rose-300"
        />
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((vin) => (
            <li
              key={vin.id}
              onClick={() => {
                router.push(`/vins/${vin.id}`);
                setShowDropdown(false);
              }}
              className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
            >
              {vin.nom} ({vin.domaine})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

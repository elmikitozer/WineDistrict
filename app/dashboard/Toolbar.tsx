"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const statusOptions = [
  { value: "", label: "Tous" },
  { value: "en_attente", label: "En attente" },
  { value: "confirmee", label: "Confirmée" },
  { value: "annulee", label: "Annulée" },
];

export default function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const status = params.get("status") ?? "";

  const update = useDebouncedCallback((key: string, value: string) => {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set(key, value); else sp.delete(key);
    router.replace(`${pathname}?${sp.toString()}`);
  }, 250);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div className="flex items-center gap-2">
        <input
          defaultValue={q}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Rechercher une réservation (vin, domaine)…"
          className="border rounded-lg px-3 py-2 w-72"
        />
        <select
          defaultValue={status}
          onChange={(e) => update("status", e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

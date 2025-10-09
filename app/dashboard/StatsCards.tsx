import { prisma } from "@/lib/prisma";

export default async function StatsCards({ cavisteId }: { cavisteId: number }) {
  // Aggregate counts per status and total
  const [total, enAttente, confirmee, annulee] = await Promise.all([
    prisma.reservation.count({ where: { cavisteId } }),
    prisma.reservation.count({ where: { cavisteId, status: "en_attente" } }),
    prisma.reservation.count({ where: { cavisteId, status: "confirmee" } }),
    prisma.reservation.count({ where: { cavisteId, status: "annulee" } }),
  ]);

  const cards = [
    { title: "Total", value: total, bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800" },
    { title: "En attente", value: enAttente, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800" },
    { title: "Confirmées", value: confirmee, bg: "bg-green-50", border: "border-green-200", text: "text-green-800" },
    { title: "Annulées", value: annulee, bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-800" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.title} className={`${c.bg} ${c.border} ${c.text} border rounded-xl p-4 shadow-sm`}> 
          <div className="text-sm opacity-80">{c.title}</div>
          <div className="text-2xl font-semibold mt-1">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

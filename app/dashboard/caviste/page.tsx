import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CavisteDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Load reservations and stocks for this caviste
  const cavisteId = user.cavisteId ?? user.caviste?.id;
  if (!cavisteId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Tableau de bord</h1>
        <p>Votre compte n'est pas lié à un caviste.</p>
      </div>
    );
  }

  const [reservations, stocks] = await Promise.all([
    prisma.reservation.findMany({
      where: { cavisteId },
      orderBy: { date: "desc" },
      include: { vin: true },
    }),
    prisma.stock.findMany({ where: { cavisteId }, include: { vin: true } }),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bonjour {user.email}</h1>
        {user.caviste?.nom && <p className="text-sm text-gray-500">Caviste: {user.caviste.nom}</p>}
        <form action="/api/auth/logout" method="post" className="mt-3">
          <button className="text-sm text-red-600 underline">Se déconnecter</button>
        </form>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Réservations récentes</h2>
        <div className="space-y-2">
          {reservations.length === 0 && <p>Aucune réservation.</p>}
          {reservations.map((r) => (
            <div key={r.id} className="border rounded p-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.vin.nom} — {r.vin.domaine} ({r.vin.année})</div>
                <div className="text-sm text-gray-600">{new Date(r.date).toLocaleString()}</div>
              </div>
              <span className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">{r.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stocks.map((s) => (
            <div key={s.id} className="border rounded p-3">
              <div className="font-medium">{s.vin.nom} — {s.vin.domaine} ({s.vin.année})</div>
              <div className="text-sm text-gray-600">Quantité: {s.quantite}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

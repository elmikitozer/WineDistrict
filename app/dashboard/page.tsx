import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const cavisteId = user.cavisteId ?? user.caviste?.id;
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord</h1>
          <p className="text-sm text-gray-600">Connecté en tant que {user.email}</p>
          {user.caviste?.nom && <p className="text-sm text-gray-500">Caviste: {user.caviste.nom}</p>}
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="text-sm text-red-600 underline">Se déconnecter</button>
        </form>
      </header>

      {!cavisteId ? (
        <p>Votre compte n'est pas lié à un caviste. Contactez un administrateur.</p>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-2">Réservations</h2>
            <DashboardReservations cavisteId={cavisteId} />
          </section>
        </>
      )}
    </div>
  );
}

async function DashboardReservations({ cavisteId }: { cavisteId: number }) {
  const reservations = await prisma.reservation.findMany({
    where: { cavisteId },
    orderBy: { date: "desc" },
    include: { vin: true },
  });
  if (reservations.length === 0) return <p>Aucune réservation.</p>;
  return (
    <div className="space-y-2">
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
  );
}

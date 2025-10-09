import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReservationStatusControl from "./ReservationStatusControl";
import StatsCards from "./StatsCards";
import Toolbar from "./Toolbar";

export default async function DashboardPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
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
          <section className="space-y-4">
            <StatsCards cavisteId={cavisteId} />
            <Toolbar />
            <div className="border rounded-xl overflow-hidden">
              <ReservationsTable cavisteId={cavisteId} q={(searchParams?.q as string) || ""} status={(searchParams?.status as string) || ""} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function statusBadgeClass(s: string) {
  switch (s) {
    case "confirmee":
      return "bg-green-100 text-green-800";
    case "annulee":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

async function ReservationsTable({ cavisteId, q, status }: { cavisteId: number; q?: string; status?: string }) {
  const where: any = { cavisteId };
  const filters: any[] = [];
  if (q && q.trim()) {
    filters.push({ vin: { nom: { contains: q, mode: "insensitive" } } });
    filters.push({ vin: { domaine: { contains: q, mode: "insensitive" } } });
  }
  if (filters.length) {
    // match vin.nom OR vin.domaine
    where.OR = filters;
  }
  if (status && ["en_attente", "confirmee", "annulee"].includes(status)) {
    where.status = status;
  }

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: "desc" },
    include: { vin: true },
  });

  if (reservations.length === 0) return <p className="p-4">Aucune réservation.</p>;

  return (
    <table className="w-full text-sm">
      <thead className="bg-rose-50 text-rose-800">
        <tr>
          <th className="text-left px-4 py-3">Vin</th>
          <th className="text-left px-4 py-3">Domaine</th>
          <th className="text-left px-4 py-3">Année</th>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">Statut</th>
          <th className="text-left px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="px-4 py-3 font-medium">{r.vin.nom}</td>
            <td className="px-4 py-3">{r.vin.domaine}</td>
            <td className="px-4 py-3">{r.vin.année}</td>
            <td className="px-4 py-3">{new Date(r.date).toLocaleString()}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded text-xs ${statusBadgeClass(r.status)}`}>{r.status}</span>
            </td>
            <td className="px-4 py-3">
              <ReservationStatusControl id={r.id} initialStatus={r.status as any} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

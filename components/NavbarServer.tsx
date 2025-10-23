// Server wrapper for Navbar to pass session state
import Navbar from './Navbar';
import { getSession, getCurrentUser } from '@/lib/auth';

export default async function NavbarServer() {
  const session = await getSession();
  const isAuthenticated = !!session?.userId;

  // Get user role to hide "Mes cavistes favoris" for cavistes
  const user = isAuthenticated ? await getCurrentUser() : null;
  const isCaviste = user?.role === 'CAVISTE' || !!user?.cavisteId;
  const cavisteId = user?.cavisteId ?? user?.caviste?.id ?? null;

  return <Navbar isAuthenticated={isAuthenticated} isCaviste={isCaviste} cavisteId={cavisteId} />;
}

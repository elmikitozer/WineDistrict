// Server wrapper for Navbar to pass session state
import Navbar from "./Navbar";
import { getSession } from "@/lib/auth";

export default async function NavbarServer() {
  const session = await getSession();
  const isAuthenticated = !!session?.userId;
  return <Navbar isAuthenticated={isAuthenticated} />;
}

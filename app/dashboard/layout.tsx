import { requireAuth } from "@/lib/auth/permissions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  return children;
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return <div>Access denied. Admin only.</div>;

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      <p>Only admin can view this section.</p>
      <ul className="list-disc pl-5 text-sm text-slate-600">
        <li>Manage system defaults</li>
        <li>Future: team/user management</li>
        <li>Future: integrations</li>
      </ul>
    </div>
  );
}

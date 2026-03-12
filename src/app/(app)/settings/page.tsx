import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return <div>Access denied. Admin only.</div>;

  return (
    <div className="space-y-5">
      <AppHeader title="Admin Settings" />
      <Card>
        <p className="text-sm subtle-text">Only admin can view this section.</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm [color:var(--text-body)]">
          <li>Manage system defaults</li>
          <li>Future: team/user management</li>
          <li>Future: integrations</li>
        </ul>
      </Card>
    </div>
  );
}

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account preferences." />
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Settings sections will live here.</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}

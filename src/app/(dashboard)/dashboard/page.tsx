import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your Web3 journey at a glance."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
            <CardDescription>Not created yet.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>0% complete.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
            <CardDescription>No matches yet.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

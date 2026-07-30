import { PageHeader } from "@/components/shared/page-header";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Your Web3 journey at a glance." />
      <DashboardOverview />
    </>
  );
}

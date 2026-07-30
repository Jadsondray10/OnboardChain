import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <>
      <PageHeader title="Payments" description="Send, receive, and track programmable money." />
      <EmptyState
        icon={CreditCard}
        title="No payment activity yet"
        description="Transactions on your Arc wallet will show up here."
      />
    </>
  );
}

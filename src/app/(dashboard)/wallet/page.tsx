import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Wallet } from "lucide-react";

export default function WalletPage() {
  return (
    <>
      <PageHeader title="Arc Wallet" description="Manage your programmable money." />
      <EmptyState
        icon={Wallet}
        title="No wallet yet"
        description="Create your Arc wallet to start transacting on-chain."
      />
    </>
  );
}

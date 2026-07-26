import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Web3 Profile" description="Your AI-powered on-chain identity." />
      <EmptyState
        icon={UserCircle}
        title="No profile yet"
        description="Your AI-powered Web3 profile will appear here once created."
      />
    </>
  );
}

import { PageHeader } from "@/components/shared/page-header";
import { VaultView } from "@/components/vault/vault-view";

export default function VaultPage() {
  return (
    <>
      <PageHeader title="Vault" description="Programmable savings on Arc." />
      <VaultView />
    </>
  );
}

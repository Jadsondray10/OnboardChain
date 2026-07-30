import { PageHeader } from "@/components/shared/page-header";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Web3 Profile" description="Your AI-generated on-chain identity." />
      <ProfileView />
    </>
  );
}

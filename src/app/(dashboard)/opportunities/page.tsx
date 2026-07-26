import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Compass } from "lucide-react";

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader title="Opportunities" description="Gigs, grants, and collabs matched to you." />
      <EmptyState
        icon={Compass}
        title="Nothing here yet"
        description="Complete your profile to unlock matched opportunities."
      />
    </>
  );
}

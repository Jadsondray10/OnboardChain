import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Map } from "lucide-react";

export default function RoadmapPage() {
  return (
    <>
      <PageHeader title="Roadmap" description="Your personalized path through Web3." />
      <EmptyState
        icon={Map}
        title="Your roadmap is being built"
        description="Once your profile is complete, a step-by-step path toward your goal will appear here."
      />
    </>
  );
}

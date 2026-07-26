import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner className="h-6 w-6" />
    </div>
  );
}

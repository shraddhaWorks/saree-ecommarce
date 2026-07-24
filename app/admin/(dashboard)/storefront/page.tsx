import StorefrontEditor from "@/components/admin/StorefrontEditor";
import BackButton from "@/components/common/BackButton";

export default function AdminStorefrontPage() {
  return (
    <div className="space-y-6">
      <BackButton />
      <StorefrontEditor />
    </div>
  );
}
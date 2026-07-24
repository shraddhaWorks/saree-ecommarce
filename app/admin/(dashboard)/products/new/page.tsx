import ProductForm from "@/components/admin/ProductForm";
import BackButton from "@/components/common/BackButton";

export default function AdminNewProductPage() {
  return (

    <div>
      <BackButton />
      <h1 className="text-2xl font-semibold mb-6">New product</h1>
      <ProductForm mode="create" />
    </div>

    );
}

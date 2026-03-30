import ProductForm from "@/components/admin/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">New product</h1>
      <ProductForm mode="create" />
    </div>
  );
}

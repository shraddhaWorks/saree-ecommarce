import { Suspense } from "react";
import AdminLoginForm from "./admin-login-form";
import BackButton from "@/components/common/BackButton";

export default function AdminLoginPage() {
  return (

    <>,

      <BackButton />
<Suspense
      fallback={
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>

    </>

    );
}

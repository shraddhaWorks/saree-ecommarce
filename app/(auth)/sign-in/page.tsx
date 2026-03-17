import { AuthShell } from "@/components/auth/shared/auth-shell";
import { SignInForm } from "@/components/auth/sign-in/sign-in-form";

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Access your wishlist, saved addresses, orders, and a faster checkout experience."
      alternateLabel="Don't have an account?"
      alternateHref="/sign-up"
      alternateText="Create one"
    >
      <SignInForm />
    </AuthShell>
  );
}

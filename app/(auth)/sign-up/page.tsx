import { AuthShell } from "@/components/auth/shared/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up/sign-up-form";
import BackButton from "@/components/common/BackButton";

export default function SignUpPage() {
  return (

    <>,

      <BackButton />
<AuthShell
      eyebrow="Create account"
      title="Sign up for a new account"
      description="Save your favorite styles, manage your orders, and make checkout easier across devices."
      alternateLabel="Already have an account?"
      alternateHref="/sign-in"
      alternateText="Sign in"
    >
      <SignUpForm />
    </AuthShell>

    </>

    );
}

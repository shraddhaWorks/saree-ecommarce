import { AuthField } from "@/components/auth/shared/auth-field";
import { SocialAuthButtons } from "@/components/auth/shared/social-auth-buttons";

export function SignUpForm() {
  return (
    <form className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">Sign Up</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Create your account</h2>
      </div>
      <SocialAuthButtons />
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/35">
        <span className="h-px flex-1 bg-border-soft" />
        or
        <span className="h-px flex-1 bg-border-soft" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AuthField label="First name" name="firstName" placeholder="First name" />
        <AuthField label="Last name" name="lastName" placeholder="Last name" />
      </div>
      <AuthField label="Email address" type="email" name="email" placeholder="you@example.com" />
      <AuthField label="Phone number" type="tel" name="phone" placeholder="Phone number" />
      <AuthField label="Password" type="password" name="password" placeholder="Create a password" />
      <label className="flex items-start gap-3 text-sm text-black/60">
        <input type="checkbox" className="mt-1 rounded border-border-soft" />
        I agree to receive updates and accept the store terms and privacy policy.
      </label>
      <button className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
        Create account
      </button>
    </form>
  );
}

const providers = ["Google", "Facebook"];

export function SocialAuthButtons() {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider}
          type="button"
          className="w-full rounded-2xl border border-border-soft bg-white px-4 py-3 text-sm font-medium text-black/75 transition hover:border-accent hover:text-accent"
        >
          Continue with {provider}
        </button>
      ))}
    </div>
  );
}

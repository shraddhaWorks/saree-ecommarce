type AuthFieldProps = {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
};

export function AuthField({
  label,
  type = "text",
  name,
  placeholder,
}: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black/75">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border-soft bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-accent"
      />
    </label>
  );
}

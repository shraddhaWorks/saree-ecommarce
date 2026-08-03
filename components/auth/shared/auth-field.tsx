"use client";

import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black/75">{label}</span>
      <div className="relative">
        <input
          type={isPasswordField && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-border-soft bg-white px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-black/35 focus:border-accent"
        />

        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-black/50 transition hover:text-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3l18 18" strokeLinecap="round" />
                <path d="M10.58 10.58a2 2 0 1 0 2.83 2.83" />
                <path d="M9.88 5.11A10.94 10.94 0 0 1 12 5c4.29 0 7.87 2.52 9.5 6a11.13 11.13 0 0 1-2.34 3.46" />
                <path d="M6.61 6.61A10.95 10.95 0 0 0 2.5 11a11.1 11.1 0 0 0 3.73 4.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
    </label>
  );
}

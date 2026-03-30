"use client";

import { useRef, useState } from "react";
import type { UploadFolder } from "@/lib/upload-client";
import { uploadImageToSupabase } from "@/lib/upload-client";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  compact?: boolean;
};

export function SupabaseImageField({
  label,
  value,
  onChange,
  folder,
  compact,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setLocalError(null);
    setBusy(true);
    try {
      const result = await uploadImageToSupabase(file, folder);
      if ("error" in result) {
        setLocalError(result.error);
        return;
      }
      onChange(result.url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={compact ? "" : "space-y-2"}>
      <span className="block text-sm text-zinc-600">{label}</span>
      {localError ? (
        <p className="text-xs text-red-600">{localError}</p>
      ) : null}
      <div className="flex flex-wrap items-start gap-3">
        {value ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-400">
            No image
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={onPick}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
          >
            {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-left text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          ) : null}
          <p className="max-w-xs text-xs text-zinc-500">
            Stored in your Supabase Storage bucket (see NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET).
          </p>
        </div>
      </div>
    </div>
  );
}

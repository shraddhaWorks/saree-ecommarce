"use client";

import { useEffect } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  okText?: string;
  cancelText?: string;
  showButtons?: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  okText = "OK",
  cancelText = "Cancel",
  showButtons = true,
  onOk,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className={`${showButtons ? "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" : "w-full max-w-sm rounded-2xl bg-[#201815] px-8 py-4 shadow-2xl"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="confirm-dialog-title"
          className={`${showButtons ? "text-lg font-semibold text-zinc-900" : "sr-only"}`}
        >
          {title}
        </h2>

        <p
          id="confirm-dialog-message"
          className={`${showButtons ? "mt-3 text-ms leading-6 text-zinc-600" : "text-center text-sm font-semibold leading-6 text-white"}`}
        >
          {message}
        </p>

        {showButtons ? (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onOk}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              {okText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
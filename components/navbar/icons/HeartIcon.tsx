export function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5 4.8 13.7a4.9 4.9 0 0 1 6.9-6.9L12 7.1l.3-.3a4.9 4.9 0 0 1 6.9 6.9L12 20.5Z" />
    </svg>
  );
}

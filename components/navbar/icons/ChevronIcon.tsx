export function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
            <path
                d="M3 5L7 9L11 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function NavSearch() {
  return (
    <form className="flex w-full max-w-md items-center gap-3 rounded-full border border-border-soft bg-white px-4 py-3">
      <span className="text-sm text-black/45">Search</span>
      <input
        type="search"
        name="search"
        placeholder="Search sarees, lehengas, jewelry..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
      />
    </form>
  );
}

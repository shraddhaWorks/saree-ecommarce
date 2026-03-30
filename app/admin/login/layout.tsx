export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-6">
      {children}
    </div>
  );
}

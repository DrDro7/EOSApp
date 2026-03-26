/**
 * Auth layout — centered card on a dark background.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-semibold text-foreground">EOS</span>
          </div>
          <p className="text-sm text-muted-foreground">Entrepreneur Operating System</p>
        </div>
        {children}
      </div>
    </div>
  );
}

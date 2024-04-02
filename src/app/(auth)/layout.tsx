export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-screen justify-center items-center">
      {children}
    </main>
  );
}

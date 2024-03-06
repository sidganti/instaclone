export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="flex min-h-screen justify-center items-center">
      {children}
    </main>
  );
}

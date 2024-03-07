interface RootLayoutProps {
  children: React.ReactNode
}

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

interface AccountCardWrapperProps {
  title: string | React.ReactNode
  description: string | React.ReactNode
  children: React.ReactNode
}

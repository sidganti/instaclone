interface LayoutProps {
  children: React.ReactNode
}

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

interface AccountCardWrapperProps {
  header: string | React.ReactNode
  description: string | React.ReactNode
  children: React.ReactNode
  footer: string | React.ReactNode
}

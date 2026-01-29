import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <p className="text-7xl font-bold tracking-tighter text-brand-blue/30 sm:text-8xl">404</p>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Page not found</h1>
        <p className="text-sm text-text-secondary">
          This page may have been moved, renamed, or doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="
            inline-flex items-center justify-center rounded-lg
            bg-brand-blue px-6 py-3 text-sm font-medium text-white
            hover:bg-brand-blue-light
            focus:ring-2 focus:ring-brand-blue focus:ring-offset-2
            transition-colors
          "
        >
          Back to homepage
        </Link>
      </div>
    </main>
  )
}
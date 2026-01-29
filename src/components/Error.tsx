import { memo } from 'react'

interface ErrorStateProps {
  message: string | null;
  title?: string;
  onRetry?: () => void;
}

const ErrorState = memo(function ErrorState({
  message,
  title = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16" role="alert">
      <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface-elevated p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {message && (
          <p className="mt-2 text-sm text-text-secondary">{message}</p>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              mt-6 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white
              hover:bg-brand-blue-light
              focus:ring-2 focus:ring-brand-blue focus:ring-offset-2
              transition-colors
            "
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
})

export default ErrorState
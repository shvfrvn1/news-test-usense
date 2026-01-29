import { memo } from 'react'

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loader = memo(function Loader({ 
  message = "Loading...", 
  size = 'lg' 
}: LoadingStateProps) {
  const spinnerSize = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }[size];

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5 text-center">
        <div
          className={`${spinnerSize} rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin`}
          aria-hidden
        />
        <p className="text-sm font-medium text-text-secondary">{message}</p>
      </div>
    </div>
  );
})

export default Loader
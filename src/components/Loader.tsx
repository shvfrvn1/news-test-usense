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
    <div className="
      flex min-h-[40vh] items-center justify-center p-6
      text-text-secondary
    ">
      <div className="flex flex-col items-center gap-4">
        <div className={`
          ${spinnerSize} rounded-full
          border-4 border-brand-blue/30 border-t-brand-blue
          animate-spin
        `} />
        <p className="
          text-lg font-medium
          text-text-primary
        ">
          {message}
        </p>
      </div>
    </div>
  );
})

export default Loader
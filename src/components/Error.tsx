interface ErrorStateProps {
  message: string | null;
  title?: string;
  onRetry?: () => void;
}

const Error = ({
  message,
  title = "Something went wrong",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="
      flex min-h-[50vh] items-center justify-center p-6 text-center
    ">
      <div className="max-w-md space-y-4">
        <h2 className="
          text-2xl font-semibold
          text-text-primary
        ">
          {title}
        </h2>
        
        {message &&
          <p className="
        text-lg
        text-text-secondary
        ">
            {message}
          </p>
        }

        {onRetry && (
          <button
            onClick={onRetry}
            className="
              mt-4 px-6 py-3 rounded-lg
              bg-brand-blue text-white
              hover:bg-brand-blue-light
              cursor-pointer
            "
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mt-10 bg-background flex flex-col items-center justify-center text-center">
      <div className="max-w-lg w-full space-y-8">
        <h1 className="
          text-8xl sm:text-9xl
          font-extrabold tracking-tighter
          text-text-primary leading-none
        ">
          404
        </h1>

        <h2 className="
          text-3xl sm:text-4xl font-bold
          text-text-primary
          m-5
        ">
          Page not found
        </h2>

        {/* Описание */}
        <p className="
          text-lg sm:text-xl text-text-secondary mx-auto
        ">
          The page you are looking for probably removed, changed name, temporarily unavailable or never exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-lg
              bg-brand-blue text-white
              hover:bg-brand-blue-light
              font-extrabold
            "
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
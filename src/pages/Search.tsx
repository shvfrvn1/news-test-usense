import { useSearchParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Search = () => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const { news, loading, error, refetch } = useNews(undefined, query)

  if (loading) {
    return (
      <Loader message='Searching...' />
    )
  }

  if (error) {
    return (
      <Error
        title="Failed to load news"
        message={error}
        onRetry={refetch}
      />
    )
  }

  if (news.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-md rounded-2xl border border-dashed border-border-subtle bg-surface-elevated/50 p-10 text-center">
          <p className="text-xl font-semibold text-text-primary">No results for &ldquo;{query}&rdquo;</p>
          <p className="mt-2 text-sm text-text-secondary">
            Try different keywords or check for typos.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:mb-8 sm:text-3xl">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((article) => (
            <li key={article.id}>
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Search
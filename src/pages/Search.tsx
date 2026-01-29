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
      <div className="
        flex min-h-[50vh] items-center justify-center p-8
        text-center
      ">
        <div className="max-w-lg">
          <p className="
            text-2xl font-semibold
            text-text-primary
            mb-4
          ">
            No results found
          </p>
          <p className="
            text-lg
            text-text-secondary
          ">
            Try adjusting your search or check for typos
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="
      px-4 sm:px-6 lg:px-8 py-6 md:py-8
      max-w-7xl mx-auto
      bg-background
    ">
      <h1 className="
        mb-6 md:mb-8
        text-2xl sm:text-3xl lg:text-4xl
        font-extrabold tracking-tight
        text-text-primary
      ">
        Results for "{query}"
      </h1>

      <div className="
        grid gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      ">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Search
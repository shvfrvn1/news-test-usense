import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import Error from '../components/Error'


const Home = () => {
  const { news, loading, error, refetch } = useNews()

  if (loading) {
    return (
      <Loader message='Loading main page...' />
    )
  }
  if (error) {
    return (
      <Error
        title="Failed to load main page"
        message={error}
        onRetry={refetch}
      />
    )
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="sr-only">Latest news</h1>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

export default Home

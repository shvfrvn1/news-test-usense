import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import Error from '../components/Error'


const Home = () => {
  const { news, loading, error } = useNews()

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
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="
      max-w-7xl mx-auto p-8 grid gap-5 
      md:grid-cols-2
      xl:grid-cols-3"
    >
      {news.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default Home

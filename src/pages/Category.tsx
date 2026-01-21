import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import type { GuardianArticle } from '../types/news'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Category = () => {
  const { section } = useParams<{ section: string }>()

  const { news, loading, error } = useNews(section)

  if (loading) {
    return (
      <Loader message="Fetching articles..." />
    )
  }

  if (error) {
    return (
      <Error
        title="Failed to load news"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  const categoryTitle = section
    ? section.toUpperCase()
    : ""

  return (
    <div className="
      bg-background min-h-screen
    ">
      <div className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-8 md:py-12
      ">
        <h1 className="
          mb-8 md:mb-10
          text-3xl sm:text-4xl lg:text-5xl
          font-extrabold tracking-tight
          text-text-primary text-center
        ">
          {categoryTitle}
        </h1>

        {news.length === 0 ? (
          <div className="
            py-20 text-center
            text-text-secondary text-lg
          ">
            No articles found in this category
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {news.map((article: GuardianArticle) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/NewsCard'
import type { GuardianArticle } from '../types/news'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Category = () => {
  const { section } = useParams<{ section: string }>()

  const { news, loading, error, refetch } = useNews(section)

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
        onRetry={refetch}
      />
    )
  }

  const categoryTitle = section ? section.charAt(0).toUpperCase() + section.slice(1) : ''

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-text-primary sm:mb-10 sm:text-4xl">
          {categoryTitle}
        </h1>

        {news.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-surface-elevated/50 py-16 text-center">
            <p className="text-lg font-medium text-text-primary">No articles in this category</p>
            <p className="mt-1 text-sm text-text-secondary">Check back later or try another section.</p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article: GuardianArticle) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Category
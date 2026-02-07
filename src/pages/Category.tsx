import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import Loader from '../components/Loader'
import Error from '../components/Error'
import InfiniteScroll from '../components/InfiniteScroll'
import VirtualNewsGrid from '../components/VirtualNewsGrid'

const Category = () => {
  const { section } = useParams<{ section: string }>()

  const { 
    news, 
    loading, 
    isFetchingNextPage, 
    hasNextPage, 
    error, 
    fetchNextPage, 
    refetch 
  } = useNews(section)

  if (loading && news.length === 0) {
    return (
      <Loader message="Fetching articles..." />
    )
  }

  if (error && news.length === 0) {
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

        {news.length === 0 && !loading ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-surface-elevated/50 py-16 text-center">
            <p className="text-lg font-medium text-text-primary">No articles in this category</p>
            <p className="mt-1 text-sm text-text-secondary">Check back later or try another section.</p>
          </div>
        ) : (
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            isLoading={isFetchingNextPage}
            error={error}
            onRetry={() => fetchNextPage()}
          >
            <VirtualNewsGrid articles={news} />
          </InfiniteScroll>
        )}
      </div>
    </main>
  )
}

export default Category
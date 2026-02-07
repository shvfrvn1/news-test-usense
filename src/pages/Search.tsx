import { useSearchParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import Loader from '../components/Loader'
import Error from '../components/Error'
import InfiniteScroll from '../components/InfiniteScroll'
import VirtualNewsGrid from '../components/VirtualNewsGrid'

const Search = () => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const { 
    news, 
    loading, 
    isFetchingNextPage, 
    hasNextPage, 
    error, 
    fetchNextPage, 
    refetch 
  } = useNews(undefined, query)

  if (loading && news.length === 0) {
    return (
      <Loader message='Searching...' />
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

  if (news.length === 0 && !loading) {
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
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          isLoading={isFetchingNextPage}
          error={error}
          onRetry={() => fetchNextPage()}
        >
          <VirtualNewsGrid articles={news} />
        </InfiniteScroll>
      </div>
    </main>
  )
}

export default Search
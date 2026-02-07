import { useNews } from '../hooks/useNews'
import Loader from '../components/Loader'
import Error from '../components/Error'
import InfiniteScroll from '../components/InfiniteScroll'
import VirtualNewsGrid from '../components/VirtualNewsGrid'

const Home = () => {
  const { 
    news, 
    loading, 
    isFetchingNextPage, 
    hasNextPage, 
    error, 
    fetchNextPage, 
    refetch 
  } = useNews()

  if (loading && news.length === 0) {
    return (
      <Loader message='Loading main page...' />
    )
  }

  if (error && news.length === 0) {
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

export default Home

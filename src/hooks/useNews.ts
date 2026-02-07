import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchNews } from '../services/index'

export const useNews = (section?: string, query?: string, pageSize = 12) => {
  const result = useInfiniteQuery({
    queryKey: ['news', section, query, pageSize],
    queryFn: async ({ pageParam = 1, signal }) => {
      return await fetchNews({ section, query, page: pageParam, pageSize }, { signal })
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.currentPage
      const pages = lastPage.pages
      if (currentPage === undefined || pages === undefined) return undefined
      return currentPage < pages ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
  })

  const news = result.data?.pages.flatMap((page) => page.results ?? []) ?? []

  return {
    news,
    loading: result.isLoading,
    isFetchingNextPage: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage,
    error: result.error ? (result.error as Error).message : null,
    fetchNextPage: result.fetchNextPage,
    refetch: result.refetch,
  }
}

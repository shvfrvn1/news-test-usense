import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../services/index'
import type { GuardianArticle } from '../types/news'

export const useNews = (section?: string, query?: string) => {
  const result = useQuery({
    queryKey: ['news', section, query],
    queryFn: async ({ signal }) => {
      const list = await fetchNews({ section, query }, { signal })
      return list as GuardianArticle[]
    },
    enabled: true,
  })

  return {
    news: result.data ?? [],
    loading: result.isLoading,
    error: result.error ? (result.error as Error).message : null,
    refetch: result.refetch,
  }
}

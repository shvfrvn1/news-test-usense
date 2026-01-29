import { useQuery } from '@tanstack/react-query'
import { fetchArticleById } from '../services/index'
import type { GuardianArticle } from '../types/news'

export const useArticle = (id: string) => {
  const result = useQuery({
    queryKey: ['article', id],
    queryFn: async ({ signal }) => {
      return fetchArticleById(id, { signal }) as Promise<GuardianArticle>
    },
    enabled: !!id,
  })

  return {
    article: result.data ?? null,
    loading: result.isLoading,
    error: result.error ? (result.error as Error).message : null,
    refetch: result.refetch,
  }
}

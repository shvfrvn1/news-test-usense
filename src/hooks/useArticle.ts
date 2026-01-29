import { useEffect, useState, useCallback } from 'react'
import { fetchArticleById } from '../services/index'
import type { GuardianArticle } from '../types/news'

export const useArticle = (id: string) => {
  const [article, setArticle] = useState<GuardianArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticle = useCallback(() => {
    setLoading(true)
    setError(null)

    fetchArticleById(id)
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    fetchArticle()
  }, [fetchArticle])

  return { article, loading, error, refetch: fetchArticle }
}

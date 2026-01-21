import { useEffect, useState } from 'react'
import { getArticleById } from '../services/api'
import type { GuardianArticle } from '../types/news'

export const useArticle = (id: string) => {
  const [article, setArticle] = useState<GuardianArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)

    getArticleById(id)
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { article, loading, error }
}

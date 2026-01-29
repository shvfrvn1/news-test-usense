import { useEffect, useState } from 'react'
import { fetchNews } from '../services/index'
import type { GuardianArticle } from '../types/news'

export const useNews = (
  section?: string,
  query?: string
) => {
  const [news, setNews] = useState<GuardianArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = () => {
    setLoading(true)
    setError(null)

    fetchNews({ section, query })
      .then(setNews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refetch()
  }, [section, query])

  return { news, loading, error, refetch }
}

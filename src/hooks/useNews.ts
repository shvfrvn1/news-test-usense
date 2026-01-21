import { useEffect, useState } from 'react'
import { fetchNews } from '../services/newsApi'
import type { GuardianArticle } from '../types/news'

export const useNews = (
  section?: string,
  query?: string
) => {
  const [news, setNews] = useState<GuardianArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)

    fetchNews(section, query)
      .then(setNews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [section, query])

  return { news, loading, error }
}

import type { GuardianArticle } from '../types/news'

const BASE_URL = 'https://content.guardianapis.com'
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

export const fetchNews = async (
  section?: string,
  query?: string
): Promise<GuardianArticle[]> => {
  const sectionParam = section ? `&section=${section}` : ''
  const queryParam = query ? `&q=${encodeURIComponent(query)}` : ''
  
  const response = await fetch(
    `${BASE_URL}/search?api-key=${API_KEY}${sectionParam}${queryParam}&show-fields=thumbnail,trailText`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch news')
  }

  const data = await response.json()
  return data.response.results || []
}

export const fetchArticleById = async (
  id: string
): Promise<GuardianArticle> => {
  const response = await fetch(
    `${BASE_URL}/${id}?api-key=${API_KEY}&show-fields=thumbnail,body,headline`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch article')
  }

  const data = await response.json()
  if (!data.response.content) {
    throw new Error('Article not found')
  }

  return data.response.content
}

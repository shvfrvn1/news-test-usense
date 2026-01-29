import { api, type RequestConfig } from './api'
import { guardianSearchResponseSchema } from '../schemas/guardian'
import type { FetchParams } from '../types/news'
import type { GuardianArticle } from '../types/news'

const DEFAULT_FIELDS = 'thumbnail,trailText'

export const fetchNews = async (
  params: FetchParams = {},
  config?: RequestConfig
): Promise<GuardianArticle[]> => {
  const { data } = await api.get<unknown>('/search', {
    params: {
      section: params.section,
      q: params.query,
      page: params.page,
      'page-size': params.pageSize,
      'show-fields': DEFAULT_FIELDS,
    },
    signal: config?.signal,
  })

  const parsed = guardianSearchResponseSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`API response validation failed: ${parsed.error.message}`)
  }

  return (parsed.data.response.results ?? []) as GuardianArticle[]
}

export const fetchArticleById = async (
  id: string,
  config?: RequestConfig
): Promise<GuardianArticle> => {
  const { data } = await api.get<unknown>(`/${id}`, {
    params: {
      'show-fields': 'thumbnail,body,headline',
    },
    signal: config?.signal,
  })

  const parsed = guardianSearchResponseSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`API response validation failed: ${parsed.error.message}`)
  }

  if (!parsed.data.response.content) {
    throw new Error('Article not found')
  }

  return parsed.data.response.content as GuardianArticle
}

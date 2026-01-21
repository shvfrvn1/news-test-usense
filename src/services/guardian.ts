import type { GuardianArticle, FetchParams, GuardianSearchResponse } from '../types/news'

import { request } from './client'

const DEFAULT_FIELDS = 'thumbnail,trailText'

export const fetchNews = async (
  params: FetchParams = {}
): Promise<GuardianArticle[]> => {
  const data = await request<GuardianSearchResponse<GuardianArticle>>({
    path: '/search',
    params: {
      section: params.section,
      q: params.query,
      page: params.page,
      'page-size': params.pageSize,
      'show-fields': DEFAULT_FIELDS,
    },
  })

  return data.response.results ?? []
}

export const fetchArticleById = async (
  id: string
): Promise<GuardianArticle> => {
  const data = await request<GuardianSearchResponse<GuardianArticle>>({
    path: `/${id}`,
    params: {
      'show-fields': 'thumbnail,body,headline',
    },
  })

  if (!data.response.content) {
    throw new Error('Article not found')
  }

  return data.response.content
}

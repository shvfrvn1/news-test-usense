import { z } from 'zod'

const guardianFieldsSchema = z.object({
  trailText: z.string().optional(),
  headline: z.string().optional(),
  body: z.string().optional(),
  thumbnail: z.string().optional(),
  lastModified: z.string().optional(),
  showInRelatedContent: z.string().optional(),
  hasStoryPackage: z.string().optional(),
  score: z.string().optional(),
  standfirst: z.string().optional(),
  shortUrl: z.string().optional(),
  wordcount: z.string().optional(),
  commentable: z.string().optional(),
  byline: z.string().optional(),
  publication: z.string().optional(),
}).passthrough()

const guardianReferenceSchema = z.object({
  id: z.string(),
  type: z.string(),
})

const guardianTagSchema = z.object({
  id: z.string(),
  type: z.string(),
  sectionId: z.string().optional(),
  sectionName: z.string().optional(),
  webTitle: z.string(),
  webUrl: z.string().optional(),
  apiUrl: z.string().optional(),
  references: z.array(guardianReferenceSchema).optional(),
}).passthrough()

const guardianArticleSchema = z.object({
  id: z.string(),
  type: z.string(),
  sectionId: z.string(),
  sectionName: z.string(),
  webPublicationDate: z.string(),
  webTitle: z.string(),
  webUrl: z.string(),
  apiUrl: z.string(),
  isHosted: z.boolean().optional(),
  pillarId: z.string().optional(),
  pillarName: z.string().optional(),
  fields: guardianFieldsSchema.optional(),
  tags: z.array(guardianTagSchema).optional(),
}).passthrough()

const guardianResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  userTier: z.string().optional(),
  total: z.number().optional(),
  startIndex: z.number().optional(),
  pageSize: z.number().optional(),
  currentPage: z.number().optional(),
  pages: z.number().optional(),
  orderBy: z.string().optional(),
  content: guardianArticleSchema.optional(),
  results: z.array(guardianArticleSchema).optional(),
})

export const guardianSearchResponseSchema = z.object({
  response: guardianResponseSchema,
})

export type GuardianSearchResponseValidated = z.infer<typeof guardianSearchResponseSchema>
export type GuardianArticleValidated = z.infer<typeof guardianArticleSchema>

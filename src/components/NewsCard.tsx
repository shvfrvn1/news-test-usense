import { memo } from 'react'
import type { GuardianArticle } from '../types/news'
import { Link } from 'react-router-dom'

interface Props {
  article: GuardianArticle
}

const NewsCard = memo(function NewsCard({ article }: Props) {
  const dateFormatted = article.webPublicationDate
    ? new Date(article.webPublicationDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <Link
      to={`/article/${encodeURIComponent(article.id)}`}
      className="
        group flex flex-col overflow-hidden rounded-xl
        border border-border-subtle bg-surface
        shadow-sm
        hover:border-brand-blue/30 hover:shadow-md
        transition-all duration-200
      "
    >
      {article.fields?.thumbnail ? (
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-surface-elevated">
          <img
            src={article.fields.thumbnail}
            alt={article.webTitle}
            className="
              h-full w-full object-cover
              transition-transform duration-300 ease-out
              group-hover:scale-[1.02]
            "
          />
        </div>
      ) : (
        <div className="aspect-[16/10] shrink-0 bg-surface-elevated" aria-hidden />
      )}

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-text-muted">
          <span>{article.sectionName}</span>
          {dateFormatted && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={article.webPublicationDate}>{dateFormatted}</time>
            </>
          )}
        </div>
        <h2 className="mb-1.5 line-clamp-2 text-base font-semibold leading-snug text-text-primary transition-colors group-hover:text-brand-blue sm:text-lg">
          {article.webTitle}
        </h2>
        {article.fields?.trailText && (
          <p
            className="line-clamp-2 text-sm text-text-secondary"
            dangerouslySetInnerHTML={{ __html: article.fields.trailText }}
          />
        )}
      </div>
    </Link>
  )
})

export default NewsCard
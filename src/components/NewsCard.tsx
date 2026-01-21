import type { GuardianArticle } from '../types/news'
import { Link } from 'react-router-dom'

interface Props {
  article: GuardianArticle
}

const NewsCard = ({ article }: Props) => {
  return (
    <Link
      to={`/article/${encodeURIComponent(article.id)}`}
      className="
        group block rounded-xl overflow-hidden
        bg-background
        border border-border-subtle
        hover:shadow-md transition-shadow duration-200
      "
    >
      {/* image */}
      {article.fields?.thumbnail && (
        <div className="overflow-hidden">
          <img
            src={article.fields.thumbnail}
            alt={article.webTitle}
            className="
              w-full h-full object-cover
              group-hover:scale-105 transition-transform duration-300
            "
          />
        </div>
      )}


      {/* card text */}
      <div className="p-5 flex flex-col space-y-1 h-full">
        {/* meta */}
        <div className="flex items-center justify-between font-light">

          <span className="uppercase tracking-wide cursor-pointer">
            {article.sectionName}
          </span>

          {article.webPublicationDate && (
            <time className="text-text-muted">
              {new Date(article.webPublicationDate).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </time>
          )}
        </div>
        {/* title */}
        <h2 className="
          font-bold text-lg leading-tight
          text-text-primary
          group-hover:text-brand-blue transition-colors duration-200
        ">
          {article.webTitle}
        </h2>

        {/* text */}
        {article.fields?.trailText && (
          <p
            className="text-sm text-text-secondary mt-2"
            dangerouslySetInnerHTML={{
              __html: article.fields.trailText,
            }}
          />
        )}

      </div>
    </Link>
  )
}

export default NewsCard
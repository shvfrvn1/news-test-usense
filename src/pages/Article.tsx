import { Link, useParams } from 'react-router-dom'
import { useArticle } from '../hooks/useArticle'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Article = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  const { article, loading, error } = useArticle(id)

  if (loading) {
    return (
      <Loader message='Loading article...' />
    )
  }
  if (error || !article) {
    return (
      <Error
        title="Failed to load article"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <article className="
      max-w-3xl mx-auto
      px-4 py-8
      bg-background
      min-h-screen
    ">
      {/* TITLE */}
      <h1 className="
        mb-5 md:mb-6
        text-2xl sm:text-3xl lg:text-4xl
        font-extrabold tracking-tight
        text-text-primary leading-tight
      ">
        {article.fields?.headline || article.webTitle}
      </h1>

      {/* INFO */}
      <div className="
        mb-6 md:mb-8
        flex flex-wrap items-center gap-4 text-sm
        text-text-muted
      ">
        <time className="text-text-muted">
          {new Date(article.webPublicationDate).toLocaleString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </time>
        <span className="font-bold uppercase tracking-wide">
          <Link to={`/category/${article.sectionName.toLocaleLowerCase()}`}>
            {article.sectionName}
          </Link>
        </span>
      </div>

      {/* IMAGE */}
      {article.fields?.thumbnail && (
        <figure className="mb-8 md:mb-10">
          <img
            src={article.fields.thumbnail}
            alt={article.webTitle}
            className="
              w-full rounded-lg shadow-md
              object-cover
            "
            loading="lazy"
          />
        </figure>
      )}

      {/* ARTICLE BODY */}
      <div
        className="
          prose
          prose-lg
          max-w-none
          article-body
          text-text-primary
        "
        dangerouslySetInnerHTML={{
          __html: article.fields?.body || '',
        }}
      />

      {/* SOURCE */}
      <div className="mt-10 pt-8 border-t border-divider">
        <a
          href={article.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            text-brand-blue hover:text-brand-blue-light
            font-medium text-sm
            transition-colors
          "
        >
          Read original article on The Guardian →
        </a>
      </div>
    </article>
  )
}

export default Article

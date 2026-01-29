import { Link, useParams } from 'react-router-dom'
import { useArticle } from '../hooks/useArticle'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Article = () => {
  const { id } = useParams<{ id: string }>()
  const { article, loading, error, refetch } = useArticle(id ?? '')

  if (!id) return null

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
        onRetry={refetch}
      />
    )
  }

  const pubDate = new Date(article.webPublicationDate).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <article className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
            <Link
              to={`/category/${article.sectionName.toLowerCase()}`}
              className="hover:text-brand-blue transition-colors"
            >
              {article.sectionName}
            </Link>
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl lg:text-4xl lg:leading-tight">
            {article.fields?.headline || article.webTitle}
          </h1>
          <time dateTime={article.webPublicationDate} className="mt-3 block text-sm text-text-muted">
            {pubDate}
          </time>
        </header>

        {article.fields?.thumbnail && (
          <figure className="mb-8 overflow-hidden rounded-xl shadow-md">
            <img
              src={article.fields.thumbnail}
              alt=""
              className="w-full object-cover"
              loading="lazy"
            />
          </figure>
        )}

        <div
          className="article-body max-w-none text-text-primary"
          dangerouslySetInnerHTML={{ __html: article.fields?.body || '' }}
        />

        <footer className="mt-12 border-t border-divider pt-8">
          <a
            href={article.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-light transition-colors"
          >
            Read on The Guardian
            <span aria-hidden>→</span>
          </a>
        </footer>
      </div>
    </article>
  )
}

export default Article

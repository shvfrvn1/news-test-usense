import { memo, type FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

const SEARCH_DEBOUNCE_MS = 400

const SearchBar = memo(function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!isFocused || !debouncedQuery.trim()) return
    navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`)
  }, [debouncedQuery, isFocused, navigate])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setQuery('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full"
      role="search"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search news..."
        aria-label="Search articles"
        className="
          w-full min-w-0 rounded-lg border border-border-subtle
          bg-surface px-3 py-2 text-sm text-text-primary
          placeholder:text-text-muted
          transition-colors
          hover:border-brand-blue/40
          focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20
        "
      />
      <button
        type="submit"
        className="
          shrink-0 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white
          hover:bg-brand-blue-light
          focus:ring-2 focus:ring-brand-blue focus:ring-offset-2
          transition-colors
        "
      >
        Search
      </button>
    </form>
  )
})

export default SearchBar

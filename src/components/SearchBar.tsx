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
      className="flex gap-2"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search news..."
        className="border text-text-primary rounded px-3 py-1 text-sm w-full"
      />
      <button
        type="submit"
        className="bg-brand-blue text-white px-4 rounded text-sm cursor-pointer"
      >
        Search
      </button>
    </form>
  )
})

export default SearchBar

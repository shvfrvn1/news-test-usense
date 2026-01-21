import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

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
}

export default SearchBar

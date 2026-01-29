import { memo } from 'react'
import { useTheme } from '../context/Theme'

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="text-sm px-3 py-1 rounded border hover:cursor-pointer
        border-gray-300 bg-white hover:bg-gray-100
        dark:bg-background-dark dark:hover:bg-background-light/80 dark:border-gray-700"
    >
      {theme === 'dark' ? '☀' : '🌙'}
    </button>
  )
})

export default ThemeToggle

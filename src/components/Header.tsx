import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../utils/categories'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

const Header = memo(function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="
        sticky top-0 z-50
        bg-background/95 backdrop-blur-md
        border-b border-border-subtle
        shadow-sm
        transition-colors duration-200
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
          <NavLink
            to="/"
            className="
              shrink-0 text-xl sm:text-2xl font-bold tracking-tight
              text-brand-blue
              hover:text-brand-blue-light
              transition-colors
            "
          >
            News
          </NavLink>

          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {CATEGORIES.map(category => (
              <NavLink
                key={category.value}
                to={category.value ? `/category/${category.value}` : '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-sm font-medium rounded-lg
                   transition-colors duration-150
                   ${isActive
                     ? 'text-brand-blue bg-brand-blue-verylight/50'
                     : 'text-text-secondary hover:text-brand-blue hover:bg-surface-elevated'
                   }`
                }
              >
                {category.label}
              </NavLink>
            ))}
            <div className="ml-4 flex items-center gap-3 pl-4 border-l border-border-subtle">
              <div className="w-56 lg:w-64">
                <SearchBar />
              </div>
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2.5 rounded-lg text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-subtle bg-surface-elevated/50">
          <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile menu">
            {CATEGORIES.map(cat => (
              <NavLink
                key={cat.value}
                to={cat.value ? `/category/${cat.value}` : '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors
                   ${isActive
                     ? 'text-brand-blue bg-brand-blue-verylight/50'
                     : 'text-text-primary hover:text-brand-blue hover:bg-surface-elevated'
                   }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-border-subtle">
              <SearchBar />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
})

export default Header
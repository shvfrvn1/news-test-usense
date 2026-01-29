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
        bg-background/90 backdrop-blur-sm
        dark:bg-background-dark
        border-b border-border-subtle
        transition-colors duration-200
      "
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="
              text-2xl sm:text-3xl
              font-extrabold tracking-tight
              text-brand-blue
              dark:text-brand-blue-light
              hover:opacity-90 transition-opacity
            "
          >
            News
          </NavLink>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-6">
            {CATEGORIES.map(category => (
              <NavLink
                key={category.value}
                to={category.value ? `/category/${category.value}` : '/'}
                className={({ isActive }) =>
                  `relative px-2 py-2.5 text-base font-medium
                   text-text-primary
                   dark:text-text-primary-dark
                   transition-colors duration-150
                   hover:text-brand-blue
                   dark:hover:text-brand-blue-light
                   ${isActive
                     ? 'text-brand-blue dark:text-brand-blue-light font-semibold'
                     : ''
                   }`
                }
              >
                {category.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-0.5 w-full
                    bg-brand-blue dark:bg-brand-blue-light
                    scale-x-0 transition-transform duration-200 origin-left
                  `}
                />
              </NavLink>
            ))}

            <div className="ml-6 flex items-center gap-4 pl-6 border-l border-border-subtle">
              <SearchBar />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              className="
                p-2 -mr-2
                text-text-secondary
                hover:text-brand-blue
              "
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            >
              {open ? (
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="
          md:hidden
          border-t border-border-subtle
          shadow-lg
        ">
          <div className="px-5 py-6 space-y-2">
            {CATEGORIES.map(cat => (
              <NavLink
                key={cat.value}
                to={cat.value ? `/category/${cat.value}` : '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3.5 rounded-md text-lg font-medium
                   transition-colors duration-150
                   ${isActive
                     ? 'text-brand-blue dark:text-brand-blue-light bg-brand-blue-verylight dark:bg-brand-blue/10'
                     : 'text-text-primary dark:text-text-primary-dark hover:text-brand-blue dark:hover:text-brand-blue-light hover:bg-surface-elevated dark:hover:bg-surface-dark-elevated'
                   }`
                }
              >
                {cat.label}
              </NavLink>
            ))}

            <div className="pt-5 mt-4 border-t border-border-subtle">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  )
})

export default Header
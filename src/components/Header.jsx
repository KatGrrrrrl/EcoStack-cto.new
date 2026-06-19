import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { categories } from '../data/mockData';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-eco-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.5-.04-1-.12-1.5" strokeLinecap="round"/>
                <path d="M16 5c1.5 1 2.5 2.5 3 4" strokeLinecap="round"/>
                <path d="M13 8c1.5 1 2.5 2.5 3 4" strokeLinecap="round"/>
                <path d="M16 3c2 1.5 3.5 3.5 4 6" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-eco-800">Eco</span>
              <span className="text-xl font-bold text-earth-600">Stack</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-eco-100 text-eco-700'
                      : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
            <NavLink
              to="/hosting-wizard"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-eco-600 text-white'
                    : 'bg-eco-50 text-eco-700 hover:bg-eco-100'
                }`
              }
            >
              Find Your Host
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-eco-100 text-eco-700'
                    : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/sell"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-earth-600 text-white'
                    : 'bg-earth-50 text-earth-700 hover:bg-earth-100'
                }`
              }
            >
              List Your Product
            </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-eco-50"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-eco-100 bg-white">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-eco-100 text-eco-700' : 'text-gray-600 hover:bg-eco-50'
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}
            <hr className="my-2 border-eco-100" />
            <Link
              to="/hosting-wizard"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold bg-eco-50 text-eco-700 hover:bg-eco-100"
            >
              🌱 Find Your Green Host
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-eco-50"
            >
              📝 Blog
            </Link>
            <Link
              to="/sell"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold bg-earth-50 text-earth-700 hover:bg-earth-100"
            >
              📢 List Your Product
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
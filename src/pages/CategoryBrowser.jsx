import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listings, categories, certifications, hostingTypes } from '../data/mockData';

export default function CategoryBrowser() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);

  const [search, setSearch] = useState('');
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    let result = [...listings];

    // Filter by category slug
    if (slug) {
      result = result.filter(l => l.category === category?.id);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        l =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tagline.toLowerCase().includes(q)
      );
    }

    // Certifications
    if (selectedCerts.length > 0) {
      result = result.filter(l =>
        selectedCerts.every(c => l.certifications.includes(c))
      );
    }

    // Hosting type
    if (selectedTypes.length > 0) {
      result = result.filter(l =>
        selectedTypes.some(t => l.types.includes(t))
      );
    }

    // Sort
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [slug, category, search, selectedCerts, selectedTypes, sortBy]);

  const toggleCert = (certId) => {
    setSelectedCerts(prev =>
      prev.includes(certId) ? prev.filter(c => c !== certId) : [...prev, certId]
    );
  };

  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCerts([]);
    setSelectedTypes([]);
    setSortBy('featured');
  };

  const hasFilters = search || selectedCerts.length > 0 || selectedTypes.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-eco-600">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category?.name || 'All Listings'}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Filters */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{category?.name || 'All Categories'}</h2>
              <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</p>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search providers..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-eco-400 focus:ring-2 focus:ring-eco-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Certification filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <label key={cert.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-eco-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert.id)}
                      onChange={() => toggleCert(cert.id)}
                      className="w-4 h-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                    />
                    <span className="text-sm text-gray-700">{cert.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hosting type filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hosting Type</label>
              <div className="space-y-1.5">
                {hostingTypes.map((type) => (
                  <label key={type.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-eco-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => toggleType(type.id)}
                      className="w-4 h-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                    />
                    <span className="text-sm text-gray-700">{type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm font-medium text-eco-600 bg-eco-50 rounded-xl hover:bg-eco-100 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              {hasFilters && <span className="text-gray-700 font-medium">{filtered.length}</span>} {filtered.length === 1 ? 'provider' : 'providers'}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:border-eco-400 focus:ring-1 focus:ring-eco-100 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="mt-4 text-eco-600 hover:text-eco-700 font-medium text-sm">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
                    item.featured
                      ? 'bg-gradient-to-r from-eco-50/80 to-white border-eco-200'
                      : 'bg-white border-gray-100 hover:border-eco-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.greenVerified && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-eco-100 text-eco-700 border border-eco-200">
                            🌱 Verified Green
                          </span>
                        )}
                        {item.premium && (
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-earth-100 text-earth-700 border border-earth-200">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.tagline}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      {item.hostedBy && (
                        <p className="text-xs text-gray-400 mt-1.5">
                          ⚡ Hosted by <span className="font-medium text-gray-500">{item.hostedBy}</span>
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.certifications.map((cert) => {
                          const certInfo = certifications.find(c => c.id === cert);
                          return (
                            <span key={cert} className="px-2 py-0.5 rounded-md text-xs bg-eco-50 text-eco-600 border border-eco-100">
                              {certInfo?.name || cert}
                            </span>
                          );
                        })}
                        {item.types.map((type) => {
                          const typeInfo = hostingTypes.find(t => t.id === type);
                          return (
                            <span key={type} className="px-2 py-0.5 rounded-md text-xs bg-gray-50 text-gray-500 border border-gray-100">
                              {typeInfo?.name || type}
                            </span>
                          );
                        })}
                        {!item.greenVerified && (
                          <span className="px-2 py-0.5 rounded-md text-xs bg-amber-50 text-amber-600 border border-amber-100">
                            ⏳ Verification Pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-earth-500">★</span>
                        <span className="font-semibold text-gray-800">{item.rating}</span>
                        <span className="text-xs text-gray-400">({item.reviews})</span>
                      </div>
                      <span className="text-sm font-medium text-eco-600 whitespace-nowrap">{item.priceRange}</span>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg text-sm font-medium bg-eco-600 text-white hover:bg-eco-700 transition-colors whitespace-nowrap"
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { listings, categories, cacheInfo } from '../data/mockData';

export default function Home() {
  const featured = listings.filter(l => l.greenVerified).slice(0, 6);
  const stats = [
    { label: 'Green Listings', value: `${cacheInfo.totalProviders}+` },
    { label: 'TGWF Verified', value: `${cacheInfo.verifiedCount}` },
    { label: 'CO2 Saved (est.)', value: '2.4M kg' },
    { label: 'Businesses Helped', value: '1,200+' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eco-50 via-white to-earth-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-eco-300 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-earth-300 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-eco-100 text-eco-700 mb-6">
                🌱 The Green Tech Directory
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Sustainable Tech,{' '}
                <span className="bg-gradient-to-r from-eco-500 to-earth-500 bg-clip-text text-transparent">
                  Curated for You
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                EcoStack is the definitive directory for eco-friendly digital infrastructure. 
                Discover green web hosting, carbon-neutral SaaS, and sustainable APIs — 
                all verified so you can reduce your digital carbon footprint with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/category/green-hosting"
                  className="px-6 py-3 bg-eco-600 text-white font-semibold rounded-xl hover:bg-eco-700 transition-all shadow-lg shadow-eco-200 hover:shadow-xl"
                >
                  Browse Green Hosting
                </Link>
                <Link
                  to="/hosting-wizard"
                  className="px-6 py-3 bg-white text-eco-700 font-semibold rounded-xl border-2 border-eco-200 hover:border-eco-400 hover:bg-eco-50 transition-all"
                >
                  Take the Quiz
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">✅ Verified Listings</span>
                <span className="flex items-center gap-1">🔄 Monthly Updates</span>
                <span className="flex items-center gap-1">📊 Carbon Data</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-eco-400/20 to-earth-400/20 rounded-full animate-pulse" />
                <div className="relative flex items-center justify-center h-full">
                  <svg viewBox="0 0 200 200" className="w-64 h-64">
                    <defs>
                      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="90" fill="none" stroke="url(#leafGrad)" strokeWidth="2" opacity="0.3" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="url(#leafGrad)" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="url(#leafGrad)" strokeWidth="1" opacity="0.7" />
                    <g transform="translate(100,100)">
                      {/* Leaf shape */}
                      <path d="M0,-40 C20,-40 40,-20 40,0 C40,10 35,20 25,25 C15,30 10,25 5,30 C0,35 -5,30 -10,25 C-20,20 -25,10 -25,0 C-25,-20 -15,-40 0,-40Z" fill="url(#leafGrad)" opacity="0.8" />
                      <path d="M-5,-20 L-15,0 L-10,15" stroke="#166534" strokeWidth="1.5" fill="none" />
                      <path d="M5,-20 L15,0 L10,15" stroke="#166534" strokeWidth="1.5" fill="none" />
                      <circle cx="0" cy="-5" r="3" fill="#facc15" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-eco-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-eco-300">{stat.value}</div>
                <div className="text-sm text-eco-100 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Browse our curated categories of verified sustainable digital infrastructure providers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group p-6 rounded-2xl border border-eco-100 hover:border-eco-300 bg-white hover:bg-eco-50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-eco-700 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-100 text-eco-700">
                    {cat.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Browse {cat.count} verified green {cat.name.toLowerCase()} providers.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-eco-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Green Providers</h2>
              <p className="mt-2 text-gray-600">Top-rated sustainable digital infrastructure solutions.</p>
            </div>
            <Link to="/category/green-hosting" className="hidden sm:flex items-center gap-1 text-eco-600 hover:text-eco-700 font-medium text-sm">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-white border border-eco-100 hover:shadow-lg hover:border-eco-200 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-eco-700 transition-colors">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.tagline}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-eco-100 text-eco-700 whitespace-nowrap border border-eco-200">
                    {item.greenVerified ? '🌱 Verified Green' : '⏳ Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                {item.hostedBy && (
                  <p className="text-xs text-gray-400 mb-2">⚡ Hosted by <span className="font-medium text-gray-500">{item.hostedBy}</span></p>
                )}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.certifications.map((cert) => (
                    <span key={cert} className="px-2 py-0.5 rounded-md text-xs bg-eco-50 text-eco-600 border border-eco-100">
                      {cert === 'tgwf' ? '🌿 TGWF Verified' : cert === 'carbon-neutral' ? '♻️ Carbon Neutral' : cert === 'renewable-energy' ? '☀️ Renewable' : '🌍 Climate Neutral'}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-eco-50">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-earth-500">★</span>
                    <span className="font-medium text-gray-800">{item.rating}</span>
                    <span className="text-gray-400">({item.reviews})</span>
                  </div>
                  <span className="text-sm font-medium text-eco-600">{item.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wizard CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-eco-600 to-eco-800 p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-eco-400/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Not Sure Where to Start?
                </h2>
                <p className="mt-4 text-eco-200 text-lg max-w-xl">
                  Take our 2-minute quiz and get personalized green hosting recommendations 
                  tailored to your project's needs and sustainability goals.
                </p>
              </div>
              <Link
                to="/hosting-wizard"
                className="px-8 py-4 bg-earth-500 hover:bg-earth-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap text-lg"
              >
                Find My Green Host →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
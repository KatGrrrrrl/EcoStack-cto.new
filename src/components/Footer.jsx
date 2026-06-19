import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-eco-950 to-eco-950 text-eco-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.5-.04-1-.12-1.5" strokeLinecap="round"/>
                  <path d="M16 5c1.5 1 2.5 2.5 3 4" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                Eco<span className="text-earth-400">Stack</span>
              </span>
            </Link>
            <p className="text-eco-300 text-sm leading-relaxed mb-4">
              The curated directory of eco-friendly digital infrastructure. Helping businesses find and switch to 
              sustainable tech that doesn't compromise on performance.
            </p>
            <div className="flex gap-3">
              {/* Social placeholders */}
              <span className="w-8 h-8 rounded-full bg-eco-800 flex items-center justify-center text-eco-300 hover:bg-eco-700 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.85.38-1.78.64-2.73.76 1-.6 1.76-1.54 2.12-2.67-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.5-1.53-2.65 0-4.8 2.15-4.8 4.8 0 .38.04.75.12 1.1-4-.2-7.55-2.12-9.92-5.03-.42.72-.66 1.55-.66 2.44 0 1.68.85 3.16 2.14 4.02-.8-.02-1.55-.24-2.2-.6v.06c0 2.34 1.66 4.3 3.87 4.74-.4.1-.83.16-1.27.16-.3 0-.6-.03-.88-.08.6 1.87 2.33 3.23 4.38 3.27-1.6 1.26-3.62 2-5.8 2-.38 0-.75-.02-1.12-.07 2.14 1.37 4.68 2.17 7.42 2.17 8.9 0 13.77-7.37 13.77-13.77 0-.2-.01-.42-.02-.62.94-.68 1.76-1.53 2.4-2.5"/></svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-eco-800 flex items-center justify-center text-eco-300 hover:bg-eco-700 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="text-eco-300 hover:text-eco-100 text-sm transition-colors">
                    {cat.name} <span className="text-eco-500">({cat.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/hosting-wizard" className="text-eco-300 hover:text-eco-100 text-sm transition-colors">Find Your Green Host</Link></li>
              <li><Link to="/blog" className="text-eco-300 hover:text-eco-100 text-sm transition-colors">Blog</Link></li>
              <li><Link to="/sell" className="text-eco-300 hover:text-eco-100 text-sm transition-colors">List Your Product</Link></li>
              <li><span className="text-eco-300 text-sm">About EcoStack</span></li>
              <li><span className="text-eco-300 text-sm">How Verification Works</span></li>
              <li><span className="text-eco-300 text-sm">Carbon Calculator</span></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="font-semibold text-white mb-4">Trust & Verification</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-eco-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                Green Web Foundation Partner
              </li>
              <li className="flex items-center gap-2 text-eco-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                500+ Listings Verified
              </li>
              <li className="flex items-center gap-2 text-eco-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                Monthly Sustainability Audits
              </li>
              <li className="flex items-center gap-2 text-eco-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400"></span>
                Transparent Carbon Reporting
              </li>
            </ul>
          </div>
        </div>

        {/* Product Hunt Launch Badge */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.producthunt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-eco-800/50 hover:bg-eco-700/50 border border-eco-700/30 hover:border-eco-600/50 transition-all duration-300"
            aria-label="EcoStack featured on Product Hunt"
          >
            <svg viewBox="0 0 260 56" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="260" height="56" rx="28" ry="28" fill="#da552f" opacity="0.85"/>
              <g transform="translate(18, 14)">
                <polygon points="14,0 28,24 0,24" fill="white" opacity="0.9"/>
                <polygon points="14,5 23,20 5,20" fill="#da552f"/>
              </g>
              <text x="52" y="22" font-family="Inter, sans-serif" font-size="9" fill="rgba(255,255,255,0.7)" font-weight="500" letter-spacing="1.5">FEATURED ON</text>
              <text x="52" y="39" font-family="Inter, sans-serif" font-size="15" fill="white" font-weight="700" letter-spacing="-0.3">Product Hunt</text>
            </svg>
            <span className="text-xs text-eco-300 group-hover:text-eco-100 transition-colors font-medium">Launching Soon</span>
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-eco-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-eco-400 text-sm">
            &copy; {currentYear} EcoStack. Every byte has a carbon cost — choose wisely.
          </p>
          <div className="flex gap-4 text-xs text-eco-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
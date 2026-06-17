import { useState } from 'react';
import { Link } from 'react-router-dom';
import WaitlistModal from '../components/WaitlistModal';

const tiers = [
  {
    name: 'Free Listing',
    price: '$0',
    period: 'forever',
    description: 'Get discovered by eco-conscious buyers.',
    features: [
      'Basic directory listing',
      'Manual verification badge',
      '1 category placement',
      'Standard search ranking',
      'Public profile page',
    ],
    cta: 'Claim Free Listing',
    highlighted: false,
    color: 'eco',
    stripeUrl: null,
  },
  {
    name: 'Premium Listing',
    price: '$29',
    period: '/month',
    description: 'Stand out and get more qualified leads.',
    features: [
      'Everything in Free',
      '⭐ Featured placement in category',
      'Verified Green badge',
      'Priority in search results',
      '3 category placements',
      'Direct lead contact form',
      'Monthly performance report',
      'Social media mention',
    ],
    cta: 'Go Premium →',
    highlighted: true,
    color: 'eco',
    stripeUrl: 'https://buy.stripe.com/4gMfZh8A1cxidoNaIkfMA00',
  },
  {
    name: 'Sponsored Spotlight',
    price: '$49',
    period: '/month',
    description: 'Maximum visibility for maximum impact.',
    features: [
      'Everything in Premium',
      '🏆 Top of category (first spot)',
      'Homepage featured slot',
      'Weekly digest placement',
      'Dedicated spotlight badge',
      'Priority support',
      'Custom CTA button',
      'All category placements',
      'Quarterly impact report',
    ],
    cta: 'Get Spotlight →',
    highlighted: false,
    color: 'earth',
    stripeUrl: 'https://buy.stripe.com/6oU5kD2bD8h2esR03GfMA01',
  },
];

const benefits = [
  { icon: '🎯', title: 'High-Intent Traffic', description: 'Buyers come to EcoStack actively looking for green solutions — they\'re ready to switch.' },
  { icon: '✅', title: 'Auto-Verification', description: 'Our system continuously verifies your green credentials via The Green Web Foundation API.' },
  { icon: '📊', title: 'Performance Dashboard', description: 'Track impressions, clicks, and leads with our self-serve analytics.' },
  { icon: '🤝', title: 'Affiliate Program', description: 'Earn commissions when you refer customers through our recommendation engine.' },
];

const faqs = [
  { q: 'How does verification work?', a: 'We check your hosting infrastructure against The Green Web Foundation database. If your provider uses renewable energy, you\'ll earn a "Verified Green" badge automatically.' },
  { q: 'Can I change my listing tier later?', a: 'Yes! You can upgrade or downgrade at any time. Changes take effect within 24 hours.' },
  { q: 'How are listings ordered?', a: 'Sponsored Spotlight listings appear first, followed by Premium listings, then Free listings. Within each tier, ratings and relevance determine order.' },
  { q: 'Is there a contract?', a: 'No long-term contracts. All paid tiers are month-to-month. Cancel anytime.' },
];

export default function SellerPortal() {
  const [modalTier, setModalTier] = useState(null);
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-eco-50 via-white to-earth-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-eco-100 text-eco-700 mb-4">
            📢 For Green Tech Providers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            List Your Product on{' '}
            <span className="bg-gradient-to-r from-eco-500 to-earth-500 bg-clip-text text-transparent">EcoStack</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join 70+ verified green tech providers. Connect with thousands of sustainability-minded 
            businesses actively searching for eco-friendly digital infrastructure.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Why List With EcoStack?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 rounded-2xl border border-eco-100 bg-white hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-eco-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15K+', label: 'Monthly Visitors' },
              { value: '77+', label: 'Active Listings' },
              { value: '94%', label: 'Satisfaction Rate' },
              { value: '3.2%', label: 'Avg. Conversion' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-eco-700">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Start with a free listing and upgrade as you grow. All plans include verification and analytics.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 lg:p-8 rounded-2xl border-2 transition-all hover:shadow-xl ${
                  tier.highlighted
                    ? 'border-eco-400 bg-white shadow-lg scale-[1.02] lg:scale-105'
                    : 'border-gray-100 bg-white'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-eco-500 to-eco-600 text-white text-xs font-bold shadow-md">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mt-2">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className={`mt-0.5 ${tier.color === 'eco' ? 'text-eco-500' : 'text-earth-500'}`}>✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    if (tier.stripeUrl) {
                      window.open(tier.stripeUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      setModalTier(tier.name);
                    }
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    tier.highlighted
                      ? 'bg-eco-600 text-white hover:bg-eco-700 shadow-lg shadow-eco-200'
                      : tier.color === 'earth'
                      ? 'bg-earth-600 text-white hover:bg-earth-700'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tier.cta}
                </button>
                {tier.highlighted && (
                  <p className="text-xs text-center text-gray-400 mt-3">Cancel anytime. No contract.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-eco-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group p-5 rounded-2xl bg-white border border-eco-100 open:border-eco-200 transition-all">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <svg className="w-5 h-5 text-eco-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Listed?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Join dozens of verified green tech providers and connect with thousands of 
            businesses looking for sustainable solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => window.open('https://buy.stripe.com/4gMfZh8A1cxidoNaIkfMA00', '_blank', 'noopener,noreferrer')} className="px-8 py-3 bg-eco-600 text-white font-bold rounded-xl hover:bg-eco-700 transition-all shadow-lg">
              Create Your Listing →
            </button>
            <span className="flex items-center text-sm text-gray-400">
              or <Link to="/" className="ml-1 text-eco-600 hover:text-eco-700">Browse the directory</Link>
            </span>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      {modalTier && (
        <WaitlistModal tier={modalTier} onClose={() => setModalTier(null)} />
      )}
    </div>
  );
}
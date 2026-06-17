import { useState } from 'react';

export default function WaitlistModal({ tier, onClose }) {
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!domain || !email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-10 animate-fadeIn">
        {!submitted ? (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Join the <span className="bg-gradient-to-r from-eco-500 to-earth-500 bg-clip-text text-transparent">{tier}</span> Waitlist
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                EcoStack Premium is currently invite-only. Enter your details to get early access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Domain / Website</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="yourcompany.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eco-400 focus:ring-2 focus:ring-eco-100 outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eco-400 focus:ring-2 focus:ring-eco-100 outline-none text-sm transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-eco-600 text-white hover:from-eco-600 hover:to-eco-700 transition-all disabled:opacity-60 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  `Join ${tier} Waitlist →`
                )}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              No spam. We'll notify you when your tier becomes available.
            </p>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eco-100 flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
            <p className="text-gray-500 text-sm mb-6">
              We'll notify <strong className="text-gray-700">{email}</strong> when <strong>{tier}</strong> becomes available for {domain}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-eco-50 text-eco-700 hover:bg-eco-100 transition-all"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
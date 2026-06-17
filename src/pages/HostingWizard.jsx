import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wizardSteps, listings } from '../data/mockData';

const audienceOptions = [
  { id: 'freelancers', label: 'Freelancer / Solo', emoji: '👤' },
  { id: 'small-business', label: 'Small Business', emoji: '🏪' },
  { id: 'agencies', label: 'Digital Agency', emoji: '🏢' },
  { id: 'enterprise', label: 'Enterprise', emoji: '🏛️' },
  { id: 'developers', label: 'Developer / Dev Team', emoji: '💻' },
];

const trafficOptions = [
  { id: 'low', label: '< 1K visits/mo', description: 'Personal site or blog' },
  { id: 'medium', label: '1K - 50K visits/mo', description: 'Small business site' },
  { id: 'high', label: '50K - 200K visits/mo', description: 'Growing business' },
  { id: 'enterprise', label: '200K+ visits/mo', description: 'High-traffic platform' },
];

const priorityOptions = [
  { id: 'max-green', label: '🌿 Maximum Green', description: '100% renewable energy is non-negotiable' },
  { id: 'balanced', label: '⚖️ Balanced', description: 'Good green + good performance/value' },
  { id: 'performance', label: '🚀 Performance First', description: 'Speed matters most, green is a plus' },
  { id: 'budget', label: '💰 Budget Friendly', description: 'Lowest cost with decent green cred' },
];

export default function HostingWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    audience: null,
    traffic: null,
    priority: null,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [started, setStarted] = useState(false);

  const selectAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      generateResults();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateResults = () => {
    // Smart matching algorithm prioritizing real verification data
    let scored = listings
      .filter(l => l.category === 'green-hosting')
      .map(l => {
        let score = 0;

        // Heavily prioritize TGWF verified providers
        if (l.greenVerified) {
          score += 5;
        }

        // Match audience
        if (answers.audience && l.audience?.includes(answers.audience)) {
          score += 3;
        }

        // Match priority based scoring
        if (answers.priority === 'max-green') {
          score += l.greenVerified ? 8 : 2;
          score += l.certifications.length * 2;
        } else if (answers.priority === 'performance') {
          score += l.rating * 1.5;
        } else if (answers.priority === 'budget') {
          score += l.greenVerified ? 4 : 1;
        } else {
          // Balanced
          score += l.greenVerified ? 5 : 0;
          score += l.certifications.length + l.rating * 0.5;
        }

        // Traffic: higher traffic favors more robust types
        if (answers.traffic === 'enterprise' || answers.traffic === 'high') {
          if (l.types.includes('dedicated') || l.types.includes('cloud')) score += 2;
        }
        if (answers.traffic === 'low') {
          if (l.types.includes('shared')) score += 1;
        }

        return { ...l, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations(scored);
    setStep(4);
  };

  const restart = () => {
    setStep(1);
    setAnswers({ audience: null, traffic: null, priority: null });
    setRecommendations([]);
    setStarted(false);
  };

  const progressPercent = ((step) / wizardSteps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      {!started ? (
        /* Intro CTA */
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-eco-400 to-eco-600 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect Green Host
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Answer 3 quick questions and we'll recommend the best eco-friendly hosting 
            provider for your specific needs. No sign-up required.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-eco-600 text-white font-bold rounded-xl hover:bg-eco-700 transition-all shadow-lg shadow-eco-200 text-lg"
          >
            Start the Quiz →
          </button>
        </div>
      ) : (
        <div>
          {/* Progress */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Step {step} of 3</span>
                <span className="text-sm font-medium text-eco-600">{wizardSteps[step - 1].title}</span>
              </div>
              <div className="w-full h-2 bg-eco-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-eco-400 to-eco-600 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1 - Audience */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Who are you building for?</h2>
              <p className="text-gray-500 mb-8">Select the option that best describes your situation.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectAnswer('audience', opt.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      answers.audience === opt.id
                        ? 'border-eco-500 bg-eco-50 shadow-md'
                        : 'border-gray-100 bg-white hover:border-eco-200 hover:bg-eco-50/50'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <h3 className="font-semibold text-gray-900 mt-2">{opt.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Traffic */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your traffic level?</h2>
              <p className="text-gray-500 mb-8">This helps us recommend the right hosting scale.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {trafficOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectAnswer('traffic', opt.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      answers.traffic === opt.id
                        ? 'border-eco-500 bg-eco-50 shadow-md'
                        : 'border-gray-100 bg-white hover:border-eco-200 hover:bg-eco-50/50'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{opt.id === 'low' ? '🕊️' : opt.id === 'medium' ? '📈' : opt.id === 'high' ? '🚀' : '🏛️'} {opt.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Priority */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your top priority?</h2>
              <p className="text-gray-500 mb-8">We'll balance your preferences with the best green options.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectAnswer('priority', opt.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      answers.priority === opt.id
                        ? 'border-eco-500 bg-eco-50 shadow-md'
                        : 'border-gray-100 bg-white hover:border-eco-200 hover:bg-eco-50/50'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{opt.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 - Results */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eco-100 flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Green Hosting Matches</h2>
                <p className="text-gray-500 mt-2">
                  Based on your answers, here are the best eco-friendly hosting providers for you.
                </p>
                <button onClick={restart} className="mt-4 text-sm text-eco-600 hover:text-eco-700 font-medium">
                  ← Retake the quiz
                </button>
              </div>

              <div className="space-y-6">
                {recommendations.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                      index === 0
                        ? 'border-eco-400 bg-gradient-to-r from-eco-50 to-white'
                        : 'border-gray-100 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-eco-600 text-white">
                              BEST MATCH
                            </span>
                          )}
                          {item.greenVerified && (
                            <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-eco-100 text-eco-700 border border-eco-200">
                              🌱 Verified Green
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{item.tagline}</p>
                        {item.hostedBy && (
                          <p className="text-xs text-gray-400 mt-1">⚡ Hosted by <span className="font-medium text-gray-500">{item.hostedBy}</span></p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-eco-600 whitespace-nowrap">{item.priceRange}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.certifications.map((cert) => (
                        <span key={cert} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-eco-50 text-eco-700 border border-eco-100">
                          {cert === 'tgwf' ? '🌿 TGWF Certified' : cert === 'carbon-neutral' ? '♻️ Carbon Neutral' : cert === 'renewable-energy' ? '☀️ 100% Renewable' : '🌍 Climate Neutral'}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-eco-50">
                      <div className="flex items-center gap-1">
                        <span className="text-earth-500">★</span>
                        <span className="font-semibold">{item.rating}</span>
                        <span className="text-gray-400 text-sm">({item.reviews} reviews)</span>
                      </div>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-eco-600 text-white hover:bg-eco-700 transition-colors"
                      >
                        Visit {item.name} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-earth-50 border border-earth-200 text-center">
                <p className="text-sm text-earth-800 font-medium">
                  🤝 When you purchase through our links, we may earn a commission at no extra cost to you.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  step === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && !answers.audience) ||
                  (step === 2 && !answers.traffic) ||
                  (step === 3 && !answers.priority)
                }
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-eco-600 text-white hover:bg-eco-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {step === 3 ? 'Get My Results →' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
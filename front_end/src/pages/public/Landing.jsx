import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';

const TIERS = [
  {
    name: 'Starter',
    price: 'Coming Soon',
    description: 'Perfect for small teams getting started.',
    features: [
      'Up to 25 employees',
      'Core HR management',
      'Leave & attendance tracking',
      'Basic payroll processing',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 'Coming Soon',
    description: 'Advanced tools for growing organisations.',
    features: [
      'Unlimited employees',
      'All Starter features',
      'Advanced analytics & reporting',
      'Role-based access control',
      'Department management',
      'Priority support',
    ],
    highlighted: true,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const openSubscribeModal = (tierName) => {
    setSelectedTier(tierName);
    setSubscribeModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary font-serif">ecoHRMS</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/trial-register')}
              className="text-sm font-semibold bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold font-serif leading-tight mb-4">
            HumanoVA HRMS
          </h2>
          <p className="text-xl opacity-90 mb-3 font-medium">Powered by ecoHRMS</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-10">
            Streamline your entire workforce — from hiring to payroll, leave management to analytics.
            One platform. Zero complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/trial-register')}
              className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Start 30-Day Free Trial
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: 'people', label: 'Employee Management' },
            { icon: 'event_available', label: 'Leave & Attendance' },
            { icon: 'payments', label: 'Payroll Processing' },
            { icon: 'bar_chart', label: 'Analytics & Reports' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="material-icons-round text-4xl text-primary">{icon}</span>
              <p className="text-sm font-medium text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-4">
            No credit card required
          </span>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            Try ecoHRMS Free for <span className="text-primary">30 Days</span>
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Get full access to all features for 30 days. Experience how ecoHRMS transforms your
            HR operations before committing to a plan.
          </p>
          <ul className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-700">
            {[
              'Full platform access',
              'Unlimited employees during trial',
              'Priority onboarding support',
              'No commitment required',
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="material-icons-round text-green-500 text-base">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate('/trial-register')}
            className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-lg"
          >
            Start Your Free 30-Day Trial
          </button>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h3 className="text-4xl font-bold text-gray-900 mb-3">Subscription Plans</h3>
            <p className="text-gray-500 text-lg">
              Flexible pricing for teams of every size. Full pricing details coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border-2 p-8 flex flex-col shadow-sm transition-shadow hover:shadow-md ${
                  tier.highlighted
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.highlighted && (
                  <span className="self-start bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h4 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h4>
                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                <div className="text-3xl font-extrabold text-primary mb-6">{tier.price}</div>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="material-icons-round text-green-500 text-base mt-0.5">check</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSubscribeModal(tier.name)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    tier.highlighted
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-md'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center text-sm">
        <p className="font-medium text-white mb-1">ecoHRMS · HumanoVA HRMS</p>
        <p>© {new Date().getFullYear()} HumanoVA. All rights reserved.</p>
      </footer>

      {/* Subscribe Modal */}
      <Modal
        isOpen={subscribeModal}
        onClose={() => setSubscribeModal(false)}
        title={`Subscribe to ${selectedTier}`}
        footer={
          <button
            onClick={() => setSubscribeModal(false)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Got it
          </button>
        }
      >
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <span className="material-icons-round text-5xl text-primary">rocket_launch</span>
          <p className="text-gray-700">
            Subscription management is coming soon! Our team is working on the payment
            backend. Once live, you'll be able to subscribe to the{' '}
            <strong>{selectedTier}</strong> plan directly from here.
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, start with our{' '}
            <button
              className="text-primary hover:underline font-medium"
              onClick={() => {
                setSubscribeModal(false);
                navigate('/trial-register');
              }}
            >
              30-day free trial
            </button>
            .
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Landing;

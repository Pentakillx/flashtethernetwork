import Link from "next/link";
import { Zap } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 mb-8 text-gray-400 hover:text-white transition-colors"
        >
          <Zap className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-gray-400 text-sm mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                FlashTether respects your privacy. This Privacy Policy explains how we collect, use,
                and protect your personal information when you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                2. Information We Collect
              </h2>
              <p className="leading-relaxed mb-4">When you use our services, we may collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information such as email address and messaging details</li>
                <li>Payment information including cryptocurrency wallet addresses</li>
                <li>Basic usage data to improve our services</li>
                <li>Technical information such as IP address and browser type</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process orders and deliver software licenses</li>
                <li>Provide customer support</li>
                <li>Send important service updates</li>
                <li>Prevent fraud and ensure security</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your information,
                including encrypted data transmission and secure storage. Your data is retained only
                as long as necessary to provide our services and comply with legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing</h2>
              <p className="leading-relaxed mb-4">
                We do not sell your personal information. We may share your data only when:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Required by law or legal process</li>
                <li>Necessary to protect our rights or safety</li>
                <li>You provide explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request access to your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain data processing</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, contact our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to enhance user experience and analyze
                website traffic. You can control these through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
              <p className="leading-relaxed">
                Our services may integrate with third-party providers for payment processing and
                communications. These providers have their own privacy policies that govern their use
                of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not
                knowingly collect information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                10. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically. Continued use of our services after
                changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
              <p className="leading-relaxed">
                For questions about this Privacy Policy, contact our support team through the methods
                provided on our website.
              </p>
            </section>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mt-8">
              <p className="text-sm text-gray-300 leading-relaxed">
                By using FlashTether services, you acknowledge that you have read and understood this
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

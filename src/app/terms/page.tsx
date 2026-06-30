import Link from "next/link";
import { Zap, AlertTriangle } from "lucide-react";

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
              <p className="text-gray-400 text-sm mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Flash USDT software and services, you agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. License Grant</h2>
              <p className="leading-relaxed mb-4">
                Upon payment, we grant you a limited, non-exclusive, non-transferable license to use
                Flash USDT software for the duration specified in your selected plan. The license is
                personal to you and may not be shared, resold, or transferred.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Licenses are valid for the purchased duration</li>
                <li>Licenses are tied to your account and cannot be transferred</li>
                <li>Usage limits apply as specified in your plan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Acceptable Use</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-yellow-100 text-sm">
                    You agree to use Flash USDT software responsibly and in compliance with all
                    applicable laws and regulations.
                  </p>
                </div>
              </div>
              <p className="leading-relaxed mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reverse engineer, decompile, or disassemble the software</li>
                <li>Share your license key or account credentials with others</li>
                <li>Use the software for any illegal or fraudulent activities</li>
                <li>Attempt to bypass or disable any security features</li>
                <li>Resell, redistribute, or sublicense the software</li>
                <li>Use the software to harm others or engage in malicious activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Payment and Refunds</h2>
              <p className="leading-relaxed mb-4">
                All payments are processed in cryptocurrency and are final. Due to the digital nature
                of our product and instant delivery, we do not offer refunds except as required by
                law.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payments must be made in the specified amount and currency</li>
                <li>License activation occurs after payment confirmation</li>
                <li>Payment issues may result in order delays</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Service Availability</h2>
              <p className="leading-relaxed">
                We strive to maintain reliable service availability but do not guarantee uninterrupted
                access. We reserve the right to modify, suspend, or discontinue any aspect of the
                service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Account Termination</h2>
              <p className="leading-relaxed mb-4">
                We reserve the right to terminate or suspend your account and access to our services
                immediately, without prior notice or liability, for any reason, including but not
                limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Breach of these Terms of Service</li>
                <li>Fraudulent or illegal activity</li>
                <li>Violation of acceptable use policies</li>
                <li>Chargebacks or payment disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed">
                Flash USDT software is provided &quot;as is&quot; without warranty of any kind, either express
                or implied. We do not warrant that the software will be error-free, secure, or
                uninterrupted. You use the software at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall Flash USDT be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to loss of profits,
                data, or use, arising out of or related to your use of the software, even if we have
                been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                9. Updates and Modifications
              </h2>
              <p className="leading-relaxed">
                We may update these Terms of Service from time to time. Continued use of our services
                after changes constitutes acceptance of the updated terms. We will notify users of
                material changes via email or through our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with
                applicable international laws. Any disputes arising from these terms shall be resolved
                through binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact our support
                team through the contact methods provided on our website.
              </p>
            </section>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mt-8">
              <p className="text-sm text-gray-300 leading-relaxed">
                By purchasing and using Flash USDT software, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

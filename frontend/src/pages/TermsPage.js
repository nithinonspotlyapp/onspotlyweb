import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div data-testid="terms-page" className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          to="/"
          data-testid="terms-back-link"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-500 mb-12">Last Updated: March 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-10 text-sm text-zinc-400 leading-relaxed"
        >
          <p>
            Welcome to Onspotly Inc. ("Onspotly", "we", "our", or "us"). By accessing or using our website and signing
            up for our waitlist (the "Service"), you agree to be bound by these Terms of Service ("Terms").
          </p>
          <p>If you do not agree with these Terms, please do not use the website.</p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              1. Purpose
            </h2>
            <p className="mb-3">The Onspotly website is currently provided for informational and waitlist purposes only.</p>
            <p className="mb-3">Users may sign up to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Learn about the Onspotly platform</li>
              <li>Join the early waitlist</li>
              <li>Help us understand demand for the service</li>
              <li>Receive company updates and launch announcements</li>
            </ul>
            <p className="mt-3">
              Onspotly is currently in a pre-launch testing stage. No active services, bookings, payments, or marketplace
              transactions are available on the website at this time.
            </p>
            <p className="mt-3">
              The information collected through the waitlist is used to verify identity, measure product demand, and test
              early traction for the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              2. Eligibility
            </h2>
            <p className="mb-3">By using this website, you confirm that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>You are at least 18 years old</li>
              <li>You have the legal capacity to agree to these Terms</li>
            </ul>
            <p className="mt-3">The Service is not intended for individuals under the age of 18.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              3. User Information
            </h2>
            <p className="mb-3">When you sign up for the waitlist, you agree to provide accurate and truthful information.</p>
            <p className="mb-3">Your submission of information may include items such as:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Name or username</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Location</li>
              <li>Portfolio or social links</li>
              <li>Any information voluntarily provided</li>
            </ul>
            <p className="mt-3">Submission of information does not guarantee acceptance into the platform.</p>
            <p className="mt-3">
              Your use of the website and submission of information is also governed by our{" "}
              <Link to="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              4. Communications and Marketing
            </h2>
            <p className="mb-3">
              By submitting your information and selecting the "Agree" option before submitting, you consent to receive
              communications from Onspotly Inc.
            </p>
            <p className="mb-3">These communications may include:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Company updates</li>
              <li>Product announcements</li>
              <li>Early access invitations</li>
              <li>Launch notifications</li>
              <li>Marketing communications</li>
              <li>Email messages</li>
              <li>SMS or text messages (if a phone number is provided)</li>
            </ul>
            <p className="mt-3">
              You may unsubscribe or opt out at any time by using the unsubscribe link in emails or contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              5. No Payments or Commercial Transactions
            </h2>
            <p className="mb-3">At this time:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Onspotly does not sell products or services through the website</li>
              <li>Onspotly does not process payments</li>
              <li>No financial transactions occur on the website</li>
            </ul>
            <p className="mt-3">Any future products or services will be governed by updated terms and policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              6. Intellectual Property
            </h2>
            <p className="mb-3">All content on the website, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>text</li>
              <li>branding</li>
              <li>logos</li>
              <li>designs</li>
              <li>graphics</li>
              <li>product concepts</li>
            </ul>
            <p className="mt-3">is the property of Onspotly Inc.</p>
            <p className="mt-1">All rights are reserved.</p>
            <p className="mt-3">
              No content from the website may be copied, reproduced, distributed, modified, or used without prior written
              permission from Onspotly Inc.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              7. Disclaimer of Warranties
            </h2>
            <p className="mb-3">The website and its content are provided on an "as is" and "as available" basis.</p>
            <p className="mb-3">Onspotly Inc. makes no warranties or guarantees regarding:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>availability of the website</li>
              <li>accuracy of information</li>
              <li>future product functionality</li>
              <li>uninterrupted access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              8. Limitation of Liability
            </h2>
            <p className="mb-3">
              To the maximum extent permitted by law, Onspotly Inc. shall not be liable for any:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>direct damages</li>
              <li>indirect damages</li>
              <li>incidental damages</li>
              <li>special damages</li>
              <li>consequential damages</li>
            </ul>
            <p className="mt-3">
              arising from or related to the use of, or inability to use, the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              9. Changes to the Terms
            </h2>
            <p className="mb-3">We may update or modify these Terms at any time.</p>
            <p className="mb-3">Changes will become effective when the updated Terms are posted on this page.</p>
            <p>Your continued use of the website after updates constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed and interpreted in accordance with the laws of the United States, without
              regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              11. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p>Onspotly Inc.</p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@onspotlyapp.com"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                support@onspotlyapp.com
              </a>
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div data-testid="privacy-policy-page" className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          to="/"
          data-testid="privacy-back-link"
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
            Privacy Policy
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
            Your privacy is important to us. This Privacy Policy explains how Onspotly Inc. ("Onspotly", "we", "our", or
            "us") collects, uses, and protects your information when you visit our website or sign up for our waitlist.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              1. Data Collection
            </h2>
            <p className="mb-3">
              When you sign up on our landing page or waitlist, we may collect the following personal information that you
              voluntarily provide:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>First name</li>
              <li>Last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>State or location</li>
            </ul>
            <p className="mt-3">We collect only the information necessary to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>verify identity</li>
              <li>understand demand for the Onspotly platform</li>
              <li>test early traction before launch</li>
            </ul>
            <p className="mt-3">
              We do not collect unnecessary personal information beyond what is required for these purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              2. Use of Data
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>add users to our waitlist</li>
              <li>verify identity and demand for the platform</li>
              <li>send company-related communications after signup</li>
              <li>explain how Onspotly works</li>
              <li>share launch dates and product updates</li>
              <li>send announcements about new features or releases</li>
              <li>respond to user questions or support requests</li>
              <li>measure early platform traction</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              3. Emails, Text Messages, and Communications
            </h2>
            <p className="mb-3">
              By signing up on our website and selecting the agreement checkbox before submitting, you acknowledge and
              agree that Onspotly Inc. may contact you.
            </p>
            <p className="mb-3">Communications may include:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>company updates</li>
              <li>product announcements</li>
              <li>launch notifications</li>
              <li>early access invitations</li>
              <li>marketing communications</li>
            </ul>
            <p className="mt-3">These communications may be sent via:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>email</li>
              <li>SMS / text messages (if a phone number is provided)</li>
            </ul>
            <p className="mt-3">
              You may unsubscribe or opt out at any time using the unsubscribe link in emails or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              4. Analytics, Advertisements, and Payments
            </h2>
            <p className="mb-3">At this time:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>We do not use analytics or tracking tools</li>
              <li>We do not display advertisements</li>
              <li>We do not sell products or services</li>
              <li>We do not accept payments through this website</li>
              <li>We do not use remarketing or behavioral advertising</li>
            </ul>
            <p className="mt-3">
              The website currently exists only to collect waitlist interest and test demand for the Onspotly platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              5. Data Sharing and Security
            </h2>
            <p className="mb-3">
              Onspotly Inc. does not sell or share personal information with third parties.
            </p>
            <p className="mb-3">Your information may be stored using secure internal tools such as:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Airtable</li>
            </ul>
            <p className="mt-3">
              We implement reasonable administrative and technical security measures to protect your data from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>unauthorized access</li>
              <li>alteration</li>
              <li>disclosure</li>
              <li>destruction</li>
            </ul>
            <p className="mt-3">However, no system can guarantee complete security.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              6. Children's Privacy
            </h2>
            <p className="mb-3">Our Service is not intended for children under the age of 13.</p>
            <p className="mb-3">We do not knowingly collect personal information from children under 13.</p>
            <p>
              If you believe that a child has submitted personal information through our website, please contact us and
              we will promptly remove the information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              7. CCPA / CPRA Privacy Rights (California Residents)
            </h2>
            <p className="mb-3">If you are a California resident, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>know what personal information we collect</li>
              <li>request access to your personal information</li>
              <li>request deletion of your personal information</li>
              <li>opt out of the sale of personal information</li>
            </ul>
            <p className="mt-3">Note: Onspotly does not sell personal data.</p>
            <p className="mt-3">To exercise these rights, please contact us using the contact information below.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              8. Data Security
            </h2>
            <p className="mb-3">
              We take reasonable administrative and technical measures to protect your personal information.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              9. Changes to This Privacy Policy
            </h2>
            <p className="mb-3">We may update this Privacy Policy from time to time.</p>
            <p className="mb-3">
              Any updates will be reflected on this page with an updated "Last Updated" date.
            </p>
            <p>
              Your continued use of the website after such changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              10. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions or requests regarding this Privacy Policy, please contact:
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

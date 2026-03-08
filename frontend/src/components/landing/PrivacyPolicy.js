import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div
      data-testid="privacy-policy-page"
      className="min-h-screen py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          to="/"
          data-testid="privacy-back-link"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-12">
          Last updated: December 2025
        </p>

        <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Information We Collect
            </h2>
            <p>
              Information collected through our waitlist and shooter application
              forms is used only for company communication and onboarding
              purposes. This includes your name, email address, phone number,
              city, portfolio links, and experience information.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              How We Use Your Information
            </h2>
            <p>
              Data may be used to notify users about the app launch and creator
              opportunities. We use the information you provide to communicate
              updates about Onspotly, process creator applications, and improve
              our services.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Data Sharing
            </h2>
            <p>
              We do not sell personal information to third parties. Your data
              remains confidential and is only shared with team members who need
              it for operational purposes.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Data Removal
            </h2>
            <p>
              Users can request data removal anytime by contacting us. We will
              process your request within a reasonable timeframe and confirm
              once your data has been removed from our systems.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Contact
            </h2>
            <p>
              For privacy requests or questions, please contact us at{" "}
              <a
                href="mailto:hello@onspotlyapp.com"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                hello@onspotlyapp.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Privacy Policy — Checkmat Brentwood",
  description:
    "Privacy Policy for Checkmat Brentwood (Gaia Jiu-Jitsu MMA LLC). Learn how we collect, use, and protect your personal information, including our SMS/text messaging program.",
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "August 3, 2026"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  const { business } = siteConfig

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C8102E] mb-2">
            {business.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-gray-300 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Section title="1. Introduction">
          <p>
            This Privacy Policy describes how Gaia Jiu-Jitsu MMA LLC, doing business as
            Checkmat Brentwood (&quot;Checkmat Brentwood,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), collects, uses, and shares your personal information when you visit
            our website, book a trial class, submit a form, or otherwise interact with us. Our
            academy is located at {business.address}.
          </p>
          <p>
            By using our website or submitting your information to us, you agree to the practices
            described in this Privacy Policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Contact information</strong> you provide directly, such as your name, email
              address, and phone number, when you fill out a booking or lead form on our website or
            on third-party platforms (such as Facebook or Instagram lead forms).
            </li>
            <li>
              <strong>Booking details</strong>, such as the class, date, and time you select, and
              information about the participant (for example, a child&apos;s age group for kids
              programs).
            </li>
            <li>
              <strong>Communications</strong>, such as the content of messages, calls, or text
              messages exchanged with us.
            </li>
            <li>
              <strong>Usage data</strong> collected automatically through cookies and similar
              technologies, such as pages visited, device and browser type, IP address, and
              interactions with our site.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Schedule, confirm, and manage your trial class or membership;</li>
            <li>
              Respond to your inquiries and communicate with you by phone, email, or text message
              (SMS);
            </li>
            <li>Send appointment reminders, confirmations, and follow-ups;</li>
            <li>Improve our website, services, and marketing;</li>
            <li>Measure the performance of our advertising campaigns;</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="4. SMS / Text Messaging Program">
          <p>
            By providing your phone number through our website forms, lead forms, or by contacting
            us, you consent to receive text messages (SMS) from Checkmat Brentwood, including
            messages sent through automated systems and virtual assistants. These messages may
            include booking confirmations, class reminders, follow-ups about your trial class, and
            occasional information about our programs.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Message frequency varies</strong> based on your interaction with us.
            </li>
            <li>
              <strong>Message and data rates may apply</strong> depending on your mobile carrier
              plan.
            </li>
            <li>
              <strong>Opt-out:</strong> You can cancel SMS messages at any time by replying{" "}
              <strong>STOP</strong>. After you send STOP, we will send a final message confirming
              you have been unsubscribed, and you will no longer receive SMS from us. To rejoin,
              simply reply START or sign up again as you did the first time.
            </li>
            <li>
              <strong>Help:</strong> If you experience issues with the messaging program, reply{" "}
              <strong>HELP</strong> for assistance, or contact us directly at{" "}
              <a href={`tel:${business.phoneRaw}`} className="text-[#C8102E] font-semibold">
                {business.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${business.email}`} className="text-[#C8102E] font-semibold">
                {business.email}
              </a>
              .
            </li>
            <li>
              <strong>Carriers</strong> are not liable for delayed or undelivered messages.
            </li>
            <li>
              <strong>No mobile information will be shared with third parties or affiliates for
              marketing or promotional purposes.</strong>{" "}
              Information sharing to subcontractors in support services, such as customer service,
              is permitted. All other use-case categories exclude text messaging originator opt-in
              data and consent; this information will not be shared with, or sold to, any third
              parties.
            </li>
          </ul>
        </Section>

        <Section title="5. Cookies, Analytics, and Advertising">
          <p>
            We use cookies and similar technologies provided by third parties to understand how
            visitors use our website and to measure advertising performance. These may include
            Google Analytics, Google Tag Manager, Meta (Facebook) Pixel, and Hotjar. These tools
            may collect information such as your IP address, device identifiers, and browsing
            behavior on our site.
          </p>
          <p>
            You can control cookies through your browser settings. To learn how these providers
            handle data, please refer to their respective privacy policies. You can opt out of
            personalized advertising through your Google and Facebook ad settings.
          </p>
        </Section>

        <Section title="6. How We Share Information">
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service providers</strong> that help us operate our business, such as
              scheduling, communication (including SMS and telephone service providers), email
              delivery, hosting, and analytics providers. These providers may only use your
              information to perform services on our behalf.
            </li>
            <li>
              <strong>Legal authorities</strong>, when required by law, court order, or to protect
              our rights, safety, or property.
            </li>
            <li>
              <strong>Business transfers</strong>, in connection with a merger, acquisition, or
              sale of assets, in which case your information may be transferred as part of that
              transaction.
            </li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes
            described in this policy, comply with legal obligations, resolve disputes, and enforce
            our agreements. When information is no longer needed, we delete or anonymize it.
          </p>
        </Section>

        <Section title="8. Your Privacy Rights (California Residents)">
          <p>
            If you are a California resident, you may have the following rights under the
            California Consumer Privacy Act (CCPA/CPRA):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to know what personal information we collect, use, and share;</li>
            <li>The right to request deletion of your personal information;</li>
            <li>The right to correct inaccurate personal information;</li>
            <li>
              The right to opt out of the sale or sharing of personal information (we do not sell
              personal information);
            </li>
            <li>The right not to be discriminated against for exercising your rights.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${business.email}`} className="text-[#C8102E] font-semibold">
              {business.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${business.phoneRaw}`} className="text-[#C8102E] font-semibold">
              {business.phone}
            </a>
            .
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            Our programs include classes for children, but our website and forms are intended to be
            used by parents and legal guardians. We do not knowingly collect personal information
            directly from children under 13. Any information about a child participant (such as age
            group) must be provided by a parent or guardian. If you believe a child has provided us
            personal information directly, contact us and we will delete it.
          </p>
        </Section>

        <Section title="10. Data Security">
          <p>
            We use reasonable administrative, technical, and physical safeguards to protect your
            personal information. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The updated version will be posted
            on this page with a revised &quot;Last updated&quot; date. We encourage you to review
            this page periodically.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
          <ul className="list-none space-y-1">
            <li>
              <strong>Gaia Jiu-Jitsu MMA LLC (dba Checkmat Brentwood)</strong>
            </li>
            <li>{business.address}</li>
            <li>
              Phone:{" "}
              <a href={`tel:${business.phoneRaw}`} className="text-[#C8102E] font-semibold">
                {business.phone}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${business.email}`} className="text-[#C8102E] font-semibold">
                {business.email}
              </a>
            </li>
          </ul>
        </Section>

        <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
          <a href="/" className="text-[#C8102E] font-semibold">
            ← Back to Checkmat Brentwood
          </a>
        </div>
      </div>
    </main>
  )
}

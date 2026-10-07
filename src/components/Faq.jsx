import { MessageCircle, PhoneCall } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import FaqAccordion from './FaqAccordion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export function Faq() {
  const { faqs, contacts, links } = BUSINESS_CONFIG

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-kr">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked"
              titleAccent="Questions"
              lead="Everything clients ask before booking a crane. If something is missing, just call us — we answer honestly."
              align="left"
              headingId="faq-heading"
            />

            <Reveal variant="slide-right" delay={120}>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-card">
                <p className="font-display text-base font-bold uppercase tracking-wide text-navy-900">
                  Still have a question?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  Share your load weight, radius and site location and we will recommend
                  the right machine.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={contacts.primaryPhoneLink} className="btn-primary flex-1">
                    <PhoneCall className="h-4 w-4" aria-hidden="true" />
                    Call
                  </a>
                  <a
                    href={links.whatsappEnquiry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp flex-1"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  )
}

export default Faq
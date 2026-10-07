import { useCallback, useState } from 'react'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Workflow from '../components/Workflow'
import Applications from '../components/Applications'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import BUSINESS_CONFIG from '../config/businessConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'

/**
 * The one-page marketing site. Service detail lives on /services/:serviceId
 * instead, so this component owns only the section stack and the cross-section
 * interactions. Navbar / footer chrome and the in-view section highlight live
 * in SiteShell.
 */
export function Home() {
  const [preselectService, setPreselectService] = useState(null)
  const { seo } = BUSINESS_CONFIG

  // Restores the home page tags after a service page, since the router swaps the
  // document head in place and nothing would otherwise put them back.
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: '/',
  })

  /** Smooth-scroll to the quote form and focus the first field. */
  const scrollToContact = useCallback((serviceId = null) => {
    if (serviceId) setPreselectService(serviceId)

    const run = () => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
    }

    if (serviceId) {
      // Let the contact section re-render with the pre-selected service first.
      requestAnimationFrame(() => setTimeout(run, 60))
    } else {
      run()
    }
  }, [])

  const handleBookService = useCallback(
    (serviceId) => scrollToContact(serviceId),
    [scrollToContact],
  )

  return (
    <main id="main">
      <Hero onRequestQuote={() => scrollToContact()} />
      <StatsBar />
      <About />
      <Services onBookService={handleBookService} />
      <WhyChooseUs />
      <Workflow />
      <Applications onRequestQuote={() => scrollToContact()} />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact
        preselectService={preselectService}
        onPreselectHandled={() => setPreselectService(null)}
      />
    </main>
  )
}

export default Home
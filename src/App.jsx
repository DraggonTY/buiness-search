import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Home,
  Camera,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from './Reveal'
import './App.css'

import garageProject from './assets/level-v/photos/garage-project.jpg'
import levelVLogo from './assets/level-v/logoforlevel.svg'
import levelVLogoWhite from './assets/level-v/logoforlevel-white.svg'
import newBuildFraming from './assets/level-v/photos/new-build-framing.jpg'
import pergolaFraming from './assets/level-v/photos/pergola-framing.jpg'
import roofStructure from './assets/level-v/photos/roof-structure.jpg'
import roofingProgress from './assets/level-v/photos/roofing-progress.jpg'
import sheathingProgress from './assets/level-v/photos/sheathing-progress.jpg'
import wallFraming from './assets/level-v/photos/wall-framing.jpg'

const phoneDisplay = '780 289 2072'
const phoneHref = 'tel:7802892072'
const email = 'levelvcontracting@gmail.com'
const instagramUrl = 'https://www.instagram.com/level.v.contracting/'
const reviewUrl = 'https://g.page/r/CRM0X07cTesKEAI/review'

const services = [
  {
    icon: Home,
    title: 'Residential framing',
    text: 'Straight, efficient framing for homes, infills, additions, garages, shops, and basement developments.',
  },
  {
    icon: ShieldCheck,
    title: 'Roofing',
    text: 'Roofing work planned around durable assemblies, clean sites, and steady communication from start to finish.',
  },
  {
    icon: Ruler,
    title: 'Garages + additions',
    text: 'Practical framing support for projects that need accurate layout, dependable scheduling, and a crew that shows up ready.',
  },
]

const gallery = [
  ['Roof structure', roofStructure],
  ['Wall sheathing', wallFraming],
  ['Deck rebuild', garageProject],
  ['Exterior sheathing', sheathingProgress],
  ['Pergola framing', pergolaFraming],
  ['New-build framing', newBuildFraming],
  ['Framing crew on site', roofingProgress],
]

const projectTypes = ['Residential framing', 'Roofing', 'Garage or shop', 'Addition or renovation']

function CustomDropdown({ label, name, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const selectedLabel = selected || placeholder

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="field custom-select-field" onKeyDown={handleKeyDown}>
      <span className="field-label">{label}</span>
      <input name={name} type="hidden" value={selected} />
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`custom-select ${selected ? 'has-value' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={isOpen ? 'is-open' : ''} size={18} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="custom-options" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              aria-selected={selected === option}
              className={selected === option ? 'is-selected' : ''}
              key={option}
              onClick={() => {
                setSelected(option)
                setIsOpen(false)
              }}
              role="option"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function QuoteForm() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
      </label>
      <CustomDropdown label="Project type" name="project" options={projectTypes} placeholder="Select one" />
      <label className="wide">
        Project details
        <textarea name="details" rows="5" placeholder="Location, timeline, plans, or a short description" />
      </label>
      <button className="button primary wide" type="submit">
        <Mail size={18} aria-hidden="true" />
        Send
      </button>
    </form>
  )
}

function App() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)

  const heroSlides = [roofStructure, sheathingProgress, newBuildFraming, pergolaFraming]

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      setHasScrolled(scrollY > 18)
      setShowBackToTop(scrollY > 320)
      setShowScrollHint(scrollY < 120)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <main>
      <nav
        className={`topbar ${hasScrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
        aria-label="Primary navigation"
      >
        <a className="brand" href="#top" aria-label="Level V Contracting home" onClick={closeMenu}>
          <img src={hasScrolled ? levelVLogo : levelVLogoWhite} alt="Level V Contracting logo" />
        </a>
        <div className="nav-links" id="primary-nav">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-phone" href={phoneHref} onClick={closeMenu}>
            <Phone size={17} aria-hidden="true" />
            {phoneDisplay}
          </a>
        </div>
        <div className="topbar-end">
          <a className="top-phone top-phone-header" href={phoneHref}>
            <Phone size={17} aria-hidden="true" />
            {phoneDisplay}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-visual" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              className={index === heroIndex ? 'is-active' : ''}
              key={slide}
              src={slide}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <MapPin size={16} aria-hidden="true" />
            Edmonton residential framing + roofing
          </p>
          <h1>Built square. Roofed tight. Ready for the next crew.</h1>
          <p className="hero-text">
            Level V Contracting helps Edmonton homeowners, builders, and renovators move framing and roofing work forward with a
            reliable crew and clean project communication.
          </p>
          <div className="hero-actions" aria-label="Contact actions">
            <a className="button primary" href={phoneHref}>
              <Phone size={18} aria-hidden="true" />
              Call for a quote
            </a>
            <a className="button secondary" href={`mailto:${email}`}>
              <Mail size={18} aria-hidden="true" />
              Email Level V
            </a>
          </div>
          <dl className="quick-facts" aria-label="Business highlights">
            <div>
              <dt>6+ years</dt>
              <dd>in operation</dd>
            </div>
            <div>
              <dt>Framing</dt>
              <dd>homes, garages, shops</dd>
            </div>
            <div>
              <dt>Roofing</dt>
              <dd>residential projects</dd>
            </div>
          </dl>
        </div>

        <a
          href="#services"
          className={`hero-scroll-indicator ${showScrollHint ? 'is-visible' : ''}`}
          aria-label="Scroll to services"
        >
          <span className="hero-scroll-indicator-label">Scroll</span>
          <ChevronDown className="hero-scroll-indicator-icon" size={20} aria-hidden="true" />
        </a>
      </section>

      <section className="section services-section" id="services">
        <Reveal className="section-heading">
          <p className="eyebrow">What they take on</p>
          <h2>Framing and roofing without the runaround.</h2>
          <p>
            The site is structured to answer a visitor’s first question quickly: “Can they handle my project, and how do I reach
            them?”
          </p>
        </Reveal>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="article" className="service-card" key={title} delay={index * 90}>
              <Icon size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="proof-band" aria-label="Reasons to contact Level V">
        <Reveal className="proof-band-cell" delay={0}>
          <CheckCircle2 size={22} aria-hidden="true" />
          Clear estimates
        </Reveal>
        <Reveal className="proof-band-cell" delay={80}>
          <CheckCircle2 size={22} aria-hidden="true" />
          Job-site ready crews
        </Reveal>
        <Reveal className="proof-band-cell" delay={160}>
          <CheckCircle2 size={22} aria-hidden="true" />
          Edmonton area service
        </Reveal>
      </section>

      <section className="section gallery-section" id="work">
        <Reveal className="section-heading">
          <p className="eyebrow">Recent work</p>
          <h2>Recent projects from Edmonton job sites.</h2>
        </Reveal>
        <div className="gallery-grid">
          {gallery.map(([title, image], index) => (
            <Reveal as="figure" className="project-tile reveal-scale" key={title} delay={index * 55}>
              <img src={image} alt={`${title} by Level V Contracting`} />
              <figcaption>{title}</figcaption>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="asset-note" delay={120}>
          Project photos from{' '}
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Level V Contracting Instagram
          </a>
          .
        </Reveal>
      </section>

      <section className="section about-section">
        <Reveal className="about-copy">
          <p className="eyebrow">About Level V</p>
          <h2>Residential framing and roofing based out of Edmonton.</h2>
          <p>
            Level V Contracting Ltd. presents itself publicly as a residential framing and roofing company based in Edmonton, AB.
            This concept site keeps the message simple: what they do, where they work, and how to request a quote.
          </p>
        </Reveal>
        <Reveal className="review-card" delay={100}>
          <Star size={24} aria-hidden="true" />
          <h3>Used Level V before?</h3>
          <p>Send visitors who already know the work straight to the Google review page.</p>
          <a className="button secondary" href={reviewUrl} target="_blank" rel="noreferrer">
            Leave a review
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </Reveal>
      </section>

      <section className="contact-section" id="contact">
        <Reveal className="contact-copy">
          <p className="eyebrow">Request a quote</p>
          <h2>Tell Level V what you are building.</h2>
          <p>Send your project details and we&apos;ll get back to you.</p>
          <div className="contact-list">
            <a href={phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {phoneDisplay}
            </a>
            <a href={`mailto:${email}`}>
              <Mail size={18} aria-hidden="true" />
              {email}
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <Camera size={18} aria-hidden="true" />
              @level.v.contracting
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <QuoteForm />
        </Reveal>
      </section>

      <footer>
        <Reveal className="footer-main">
          <p>Level V Contracting Ltd. concept website for framing and roofing quote leads.</p>
        </Reveal>
        <Reveal as="p" className="footer-credit" delay={80}>
          Built by{' '}
          <a href="https://remdestudios.com" target="_blank" rel="noreferrer">
            Remde Studios
          </a>
          .
        </Reveal>
      </footer>

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={22} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </main>
  )
}

export default App

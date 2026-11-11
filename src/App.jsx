import { useEffect, useMemo, useState } from 'react';
import {
  eventArchive,
  events,
  instagramUrl,
  mapsUrl,
  menuSections,
  roomPhotos,
  rooftopVideos,
  whatsappNumber,
} from './content.js';

const navItems = [
  ['Café', '/'],
  ['Menu', '/menu'],
  ['Events', '/events'],
  ['Retreats', '/retreats'],
  ['Stay', '/stay'],
  ['Volunteer', '/volunteer'],
  ['Visit', '/visit'],
];

const homeHeroSlides = [
  { type: 'image', src: '/assets/chapter-cafe-postcard-01.jpg', alt: 'A balcony at The Himalayan Chapter overlooking Tapovan and the hills', caption: 'Take in the view.' },
  { type: 'image', src: '/assets/chapter-cafe-postcard-02.jpg', alt: 'The rooftop terrace set for a relaxed meal with mountain views', caption: 'A table above the town.' },
  { type: 'image', src: '/assets/chapter-cafe-postcard-03.jpg', alt: 'Open-air rooftop seating with the Tapovan hills beyond', caption: 'Room to breathe.' },
  { type: 'image', src: '/assets/chapter-cafe-postcard-04.jpg', alt: 'A bright, welcoming lounge inside The Himalayan Chapter', caption: 'Come find your corner.' },
  { type: 'image', src: '/assets/chapter-cafe-postcard-05.jpg', alt: 'Guests gathered for a shared rooftop evening at The Himalayan Chapter', caption: 'Good company, open skies.' },
  { type: 'image', src: '/assets/chapter-cafe-postcard-06.jpg', alt: 'A new view of The Himalayan Chapter shared by the café', caption: 'One more frame from our story.' },
];

function waLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.25a8.6 8.6 0 0 0-7.4 12.98L3.5 20.5l4.4-1.08A8.6 8.6 0 1 0 12 3.25Z" />
      <path d="M9 8.4c.2-.48.45-.5.72-.5h.58c.18 0 .4.07.51.38l.75 1.8c.1.24.08.45-.08.65l-.57.7c-.16.18-.2.38-.05.64a7.1 7.1 0 0 0 2.93 2.8c.25.14.46.12.64-.08l.78-.9c.2-.22.42-.27.68-.16l1.73.83c.27.13.4.25.4.46 0 .28-.17 1.3-.88 1.83-.58.44-1.34.66-2.27.4a12 12 0 0 1-4.04-2.2 11.1 11.1 0 0 1-3.1-3.84c-.55-1.13-.6-2.15-.12-2.81.42-.59.91-.81 1.39-.81Z" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg className="call-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.1 3.9h2.35l1.18 4.12-1.6 1.58a15.4 15.4 0 0 0 5.37 5.37l1.58-1.6 4.12 1.18v2.35a2.1 2.1 0 0 1-2.28 2.09A15.92 15.92 0 0 1 5 6.18 2.1 2.1 0 0 1 7.1 3.9Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppLink({ children, message, className = 'button button-dark', ...props }) {
  return <a className={className} href={waLink(message)} target="_blank" rel="noreferrer" {...props}><WhatsAppIcon />{children}</a>;
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand({ small = false }) {
  return (
    <a className={`brand ${small ? 'brand-small' : ''}`} href="/" aria-label="The Himalayan Chapter home">
      <span className="brand-crest"><img src="/assets/chapter-brand-logo.png" alt="The Himalayan Chapter official crest" /></span>
      <span className="brand-copy"><strong>The Himalayan Chapter</strong><small>More Than a Place. A Chapter.</small></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Brand />
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          <span /><span />
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className={(path === href || (href !== '/' && path.startsWith(href))) ? 'active' : ''}>{label}</a>)}
          <WhatsAppLink className="button button-nav" message="Hello! I would like to reserve a table at The Himalayan Chapter.">Reserve a table <Arrow /></WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-invitation">
        <div><span className="eyebrow">There’s always room at the table</span><h2>Come as you are.<br /><em>Leave with a story.</em></h2></div>
        <WhatsAppLink className="button button-light" message="Hi! I’d love to make a Chapter of my visit. Could you help me plan a good time to come?">Let’s plan your visit <Arrow diagonal /></WhatsAppLink>
      </div>
      <div className="wrap footer-grid">
        <div><Brand small /><p className="footer-line">Old flavours, new stories.<br />More Than a Place. A Chapter.</p></div>
        <div className="footer-links"><strong>Find your next chapter</strong>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div className="footer-links"><strong>Come find us</strong><span>Tapovan, Rishikesh<br />Uttarakhand, India</span><a href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a><a href={instagramUrl} target="_blank" rel="noreferrer">Follow along on Instagram <Arrow diagonal /></a><a href="/#story-wall">Leave a note on our story wall <Arrow /></a></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Nostalgia Co. Collective</span><span>Made for slow mornings, second helpings & one more story.</span></div>
    </footer>
  );
}

function PageIntro({ eyebrow, title, text, image, imageAlt = 'The Himalayan Chapter', className = '' }) {
  return (
    <section className={`page-intro wrap ${className}`}>
      <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>
      {image && <img src={image} alt={imageAlt} />}
    </section>
  );
}

function HomePage() {
  const [story, setStory] = useState('');
  const [storyName, setStoryName] = useState('');
  const [mayFeatureStory, setMayFeatureStory] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroCarouselPaused, setIsHeroCarouselPaused] = useState(false);
  const showHeroSlide = (index) => setActiveHeroSlide((index + homeHeroSlides.length) % homeHeroSlides.length);
  const currentHeroSlide = homeHeroSlides[activeHeroSlide];
  useEffect(() => {
    if (isHeroCarouselPaused || currentHeroSlide.type === 'video' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActiveHeroSlide((current) => {
        for (let offset = 1; offset < homeHeroSlides.length; offset += 1) {
          const next = (current + offset) % homeHeroSlides.length;
          if (homeHeroSlides[next].type === 'image') return next;
        }
        return current;
      });
    }, 3800);
    return () => window.clearInterval(timer);
  }, [currentHeroSlide.type, isHeroCarouselPaused]);
  const storyMessage = [
    'Hi! I’d like to leave a note for The Himalayan Chapter story wall.',
    storyName.trim() ? `Name to credit (optional): ${storyName.trim()}` : 'Please keep my note anonymous.',
    `My memory or feedback: ${story.trim()}`,
    `You may feature this note publicly after review: ${mayFeatureStory ? 'Yes' : 'No'}.`,
  ].join('\n\n');

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-topography" aria-hidden="true" />
          <img className="hero-brand-watermark" src="/assets/chapter-brand-logo.png" alt="" aria-hidden="true" />
          <div className="hero-grid wrap">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> Tapovan · Rishikesh</span>
              <span className="hero-memory-label">Nostalgia, served at the table</span>
              <h1>One taste.<br /><em>A thousand memories.</em></h1>
              <p>From slow mountain mornings to bajra roti and churma shared around the table—come find a little taste of home in Tapovan.</p>
              <div className="hero-actions"><WhatsAppLink className="button button-light" message="Hi! What nostalgic or traditional food is on at The Himalayan Chapter today?">Ask what’s cooking <Arrow diagonal /></WhatsAppLink><a className="button button-ghost" href="/menu">Wander through the menu <Arrow /></a></div>
              <div className="hero-note"><span className="note-rule" /> <span>More Than a Place.<br /><strong>A Chapter to come back to.</strong></span></div>
            </div>
            <div className="hero-stage">
              <div
                className={`hero-carousel${isHeroCarouselPaused || currentHeroSlide.type === 'video' ? ' is-paused' : ''}`}
                role="region"
                aria-label="Postcards from The Himalayan Chapter"
                aria-roledescription="carousel"
                onMouseEnter={() => setIsHeroCarouselPaused(true)}
                onMouseLeave={() => setIsHeroCarouselPaused(false)}
                onFocusCapture={() => setIsHeroCarouselPaused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsHeroCarouselPaused(false);
                }}
              >
                <div className="hero-photo-frame hero-carousel-slide" key={currentHeroSlide.src}>
                  {currentHeroSlide.type === 'video'
                    ? <video key={currentHeroSlide.src} className="hero-image hero-video" controls playsInline preload="none" poster={currentHeroSlide.poster} aria-label={currentHeroSlide.alt}><source src={currentHeroSlide.src} type="video/mp4" />Your browser does not support embedded videos.</video>
                    : <img className="hero-image" src={currentHeroSlide.src} alt={currentHeroSlide.alt} loading={activeHeroSlide === 0 ? 'eager' : 'lazy'} fetchPriority={activeHeroSlide === 0 ? 'high' : 'auto'} decoding="async" />}
                  <button className="hero-carousel-arrow hero-carousel-previous" type="button" aria-label="Previous postcard" onClick={() => showHeroSlide(activeHeroSlide - 1)}>←</button>
                  <button className="hero-carousel-arrow hero-carousel-next" type="button" aria-label="Next postcard" onClick={() => showHeroSlide(activeHeroSlide + 1)}>→</button>
                  <div className="image-stamp"><span>{currentHeroSlide.caption}</span><b>·</b><span>{String(activeHeroSlide + 1).padStart(2, '0')} / {String(homeHeroSlides.length).padStart(2, '0')}</span></div>
                </div>
                <div className="hero-carousel-controls">
                  <span className="hero-carousel-caption">A little postcard from Tapovan</span>
                  <div className="hero-carousel-actions">
                    <div className="hero-carousel-dots" role="group" aria-label="Choose a postcard">
                      {homeHeroSlides.map((slide, index) => <button key={slide.src} className={`hero-carousel-dot${index === activeHeroSlide ? ' is-active' : ''}`} type="button" aria-label={`Show postcard ${index + 1}: ${slide.caption}`} aria-pressed={index === activeHeroSlide} onClick={() => showHeroSlide(index)} />)}
                    </div>
                  </div>
                  <div className="hero-carousel-progress" key={`hero-progress-${activeHeroSlide}-${isHeroCarouselPaused}`} aria-hidden="true"><span /></div>
                </div>
              </div>
              <span className="hero-edition">TAPOVAN<br />EDITION</span>
            </div>
          </div>
          <a className="hero-scroll wrap" href="#chapter">Scroll to explore <span>↓</span></a>
        </section>

        <section className="intro-band" id="chapter"><div className="wrap intro-grid"><span className="eyebrow">More Than a Place. A Chapter.</span><h2>A familiar flavour.<br /><em>A story of your own.</em></h2><div><p>Some meals bring back a kitchen, a season, a person. We make room for those flavours—and the stories you bring with you—to find their way to the table.</p><WhatsAppLink className="text-link" message="Hi! I’d love to visit The Himalayan Chapter. Could you help me plan a good time to come?">Plan a visit with us <Arrow diagonal /></WhatsAppLink></div></div></section>

        <section className="chapter-gallery section-pad wrap" aria-labelledby="chapter-gallery-title">
          <div className="section-heading"><div><span className="eyebrow">A few frames from our story</span><h2 id="chapter-gallery-title">Come for a moment.<br /><em>Leave with a memory.</em></h2></div><a className="text-link" href="/events">See what brings us together <Arrow /></a></div>
          <div className="chapter-gallery-grid">
            <figure className="chapter-gallery-feature"><img src="/assets/chapter-memories-collage.jpg" alt="A collage of rooftop music, café gatherings, mountain views, and shared meals at The Himalayan Chapter" loading="lazy" decoding="async" /><figcaption>People, music, mountains, meals.</figcaption></figure>
            <figure><img src="/assets/chapter-lounge-evening.jpg" alt="Warm red drapes and lounge seating inside The Himalayan Chapter" loading="lazy" decoding="async" /><figcaption>Find your corner.</figcaption></figure>
            <figure><img src="/assets/chapter-lounge-wide.jpg" alt="A cozy lounge with lanterns and a long shared table" loading="lazy" decoding="async" /><figcaption>Stay for one more story.</figcaption></figure>
            <figure><img src="/assets/chapter-rooftop-gathering.jpg" alt="Friends gathering for a rooftop evening at The Himalayan Chapter" loading="lazy" decoding="async" /><figcaption>Good company, open skies.</figcaption></figure>
            <figure><img src="/assets/chapter-rooftop-music.jpg" alt="Live music shared under the open sky on the rooftop" loading="lazy" decoding="async" /><figcaption>A song to take home.</figcaption></figure>
            <figure><img src="/assets/chapter-rooftop-panorama.jpg" alt="A wide view of the Himalayan Chapter rooftop with the Tapovan hills beyond" loading="lazy" decoding="async" /><figcaption>Room for a longer evening.</figcaption></figure>
          </div>
        </section>

        <section className="home-films section-pad" aria-labelledby="home-films-title">
          <div className="wrap">
            <div className="section-heading home-films-heading">
              <div><span className="eyebrow">Little moving postcards</span><h2 id="home-films-title">Some evenings<br /><em>are better in motion.</em></h2></div>
              <a className="text-link" href="/events">More rooftop stories <Arrow /></a>
            </div>
            <div className="home-film-grid">
              {rooftopVideos.map((video, index) => (
                <article className="home-film" key={video.src}>
                  <div className="home-film-frame">
                    <video controls playsInline preload="none" poster={index === 0 ? '/assets/chapter-rooftop-music.jpg' : '/assets/chapter-rooftop-gathering.jpg'} aria-label={video.title}>
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support embedded videos.
                    </video>
                  </div>
                  <div className="home-film-copy"><h3>{video.title}</h3><p>{video.note}</p></div>
                </article>
              ))}
            </div>
            <p className="home-films-note">Tap play when you’re ready; the videos won’t load until then.</p>
          </div>
        </section>

        <section className="story-wall section-pad" id="story-wall" aria-labelledby="story-wall-title">
          <div className="wrap story-wall-grid">
            <div className="story-wall-intro">
              <span className="eyebrow">The Chapter is made of your stories</span>
              <h2 id="story-wall-title">Leave a little<br /><em>piece of your visit.</em></h2>
              <p>A familiar flavour, a lovely evening, a small thing that made you feel at home. Tell us about it and help our digital story wall grow.</p>
              <div className="story-prompts" aria-label="Story ideas">
                {['What did your first bite remind you of?', 'Who would you bring here next time?', 'What should we do more of?'].map((prompt) => (
                  <button type="button" key={prompt} onClick={() => setStory((current) => current ? `${current}\n\n${prompt} ` : `${prompt} `)}>{prompt}</button>
                ))}
              </div>
            </div>
            <form className="story-wall-form" onSubmit={(event) => event.preventDefault()}>
              <label className="story-field">
                <span>Your note <span aria-hidden="true">*</span></span>
                <textarea value={story} onChange={(event) => setStory(event.target.value)} maxLength={500} placeholder="A taste, a moment, a suggestion…" required />
                <small>{story.length}/500</small>
              </label>
              <label className="story-field story-name-field">
                <span>Name to credit <span className="story-optional">(optional)</span></span>
                <input value={storyName} onChange={(event) => setStoryName(event.target.value)} maxLength={40} placeholder="Leave blank to stay anonymous" />
              </label>
              <label className="story-consent">
                <input type="checkbox" checked={mayFeatureStory} onChange={(event) => setMayFeatureStory(event.target.checked)} />
                <span>You may feature my note on the public story wall after reviewing it.</span>
              </label>
              <a
                className={`button button-dark story-submit${story.trim() ? '' : ' is-disabled'}`}
                href={waLink(storyMessage)}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!story.trim()}
                onClick={(event) => { if (!story.trim()) event.preventDefault(); }}
              >
                Share your note on WhatsApp <Arrow diagonal />
              </a>
              <p className="story-privacy">No account or on-site storage. WhatsApp opens with your draft for you to send; your number may be visible to the café there. Nothing is published without your permission and our review. No reward is offered yet.</p>
            </form>
          </div>
        </section>

        <section className="nostalgia-table section-pad wrap" aria-labelledby="nostalgia-title">
          <div className="nostalgia-heading">
            <div>
              <span className="eyebrow">A little taste of home</span>
              <h2 id="nostalgia-title">The kind of food<br /><em>that takes you back.</em></h2>
            </div>
            <p>Not every day calls for something new. Sometimes it’s the roti you remember, the churma you grew up with, and one more story before you go.</p>
          </div>
          <div className="nostalgia-dishes">
            <article className="nostalgia-dish nostalgia-dish-first">
              <span className="nostalgia-dish-number">01 · FROM THE GRAIN</span>
              <h3>Bajra roti<br /><em>& churma</em></h3>
              <WhatsAppLink className="nostalgia-dish-link" message="Hi! Do you have bajra roti and churma on the menu today or coming up soon?">Ask when it’s on <Arrow diagonal /></WhatsAppLink>
            </article>
            <article className="nostalgia-dish nostalgia-dish-second">
              <span className="nostalgia-dish-number">02 · FROM THE TAWA</span>
              <h3>Makki di<br /><em>roti</em></h3>
              <WhatsAppLink className="nostalgia-dish-link" message="Hi! I’m craving makki di roti. Is it available today or on any upcoming special menu?">Ask when it’s on <Arrow diagonal /></WhatsAppLink>
            </article>
            <article className="nostalgia-dish nostalgia-dish-third">
              <span className="nostalgia-dish-number">03 · A SWEET MEMORY</span>
              <h3>Wheat<br /><em>churma</em></h3>
              <WhatsAppLink className="nostalgia-dish-link" message="Hi! Do you serve wheat churma at The Himalayan Chapter? I’d love to know when it’s next available.">Ask when it’s on <Arrow diagonal /></WhatsAppLink>
            </article>
          </div>
          <div className="nostalgia-footnote"><span>These traditional favourites make special appearances, not a daily promise.</span><WhatsAppLink className="nostalgia-whatsapp-link" message="Hi! I’m looking for something nostalgic and homemade-feeling. What’s on the table today?">Tell us what you miss <Arrow diagonal /></WhatsAppLink></div>
        </section>

        <section className="food-section section-pad wrap">
          <div className="section-heading"><div><span className="eyebrow">From first cup to last bite</span><h2>Food with a story.<br /><em>Flavour with a view.</em></h2></div><WhatsAppLink className="text-link" message="Hi! Could you share today’s menu and any nostalgic specials?">Ask for today’s menu <Arrow diagonal /></WhatsAppLink></div>
          <div className="food-grid">
            <article className="food-feature"><div className="food-feature-copy"><span className="eyebrow">Thoughtfully wholesome</span><h3>Old wisdom.<br />A generous bowl.</h3><p>Explore nourishing plates alongside Israeli breakfasts, Indian comfort food, café favourites and a little something sweet.</p><a className="button button-dark" href="/menu">See what’s cooking <Arrow /></a></div><div className="food-feature-seal">CHAPTER<br /><span>03</span><br />WHOLESOME</div></article>
            <article className="food-card"><span className="food-number">01 / MORNING</span><div className="food-card-bottom"><h3>Breakfasts<br />worth waking for.</h3><p>Israeli, Indian, continental and vegan plates.</p></div></article>
            <article className="food-card food-card-night"><span className="food-number">04 / EVENING</span><div className="food-card-bottom"><h3>Stay for<br />one more course.</h3><p>Comforting dinners, easy conversation, rooftop air.</p></div></article>
          </div>
        </section>

        <section className="stay-teaser"><div className="stay-teaser-image"><img src="/assets/stay-room-01.jpg" alt="A bright guest room at Nostalgia Co." /></div><div className="stay-teaser-copy"><span className="eyebrow">Stay a little longer</span><h2>Let the mountains<br /><em>be your morning view.</em></h2><p>Make a night of it at Nostalgia Co. Comfortable rooms, a rooftop upstairs, and a slower start waiting below.</p><div className="stay-price">Rooms from <strong>₹2,500+</strong><span>per night</span></div><a className="button button-light" href="/stay">Discover your stay <Arrow /></a></div></section>

        <section className="retreat-teaser" aria-labelledby="retreat-teaser-title">
          <div className="retreat-teaser-image"><img src="/assets/chapter-weekend-guide.jpg" alt="A weekend guide to the café, rooftop, mountains and Rishikesh experiences" loading="lazy" decoding="async" /></div>
          <div className="retreat-teaser-copy">
            <span className="eyebrow">A weekend that moves you</span>
            <h2 id="retreat-teaser-title">Meet <em>Rajas.</em><br />Find your Rishikesh.</h2>
            <p>Three days, two nights, and a little more life in every moment—local discoveries, good food and rooftop nights, thoughtfully brought together by The Himalayan Chapter.</p>
            <div className="retreat-teaser-facts"><span>Every weekend</span><span>From ₹8,999 per person</span></div>
            <a className="button button-dark" href="/retreats">Discover the retreat <Arrow /></a>
          </div>
        </section>

        <section className="events-teaser section-pad"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">When the lights come on</span><h2>Evenings that<br /><em>stay with you.</em></h2></div><a className="text-link" href="/events">See the events <Arrow /></a></div><div className="event-teaser-grid"><img src="/assets/chapter-lounge-detail.jpg" alt="A warm, intimate seating corner inside The Himalayan Chapter café" loading="lazy" decoding="async" /><div className="event-teaser-copy"><span className="eyebrow">Open mic · Live music · Rooftop gatherings</span><h3>There’s always room<br />for one more song.</h3><p>From open mics and fusion kirtan to evenings with the mountains in view, our calendar follows the people who make the night.</p><a className="button button-dark" href="/events">Explore event nights <Arrow /></a></div><img src="/assets/chapter-rooftop-panorama.jpg" alt="The Himalayan Chapter rooftop terrace with Tapovan and mountain views" loading="lazy" decoding="async" /></div></div></section>

        <VisitStrip />
      </main>
    </>
  );
}

function MenuPage() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleSections = menuSections
    .map((section, index) => ({
      ...section,
      chapter: index + 1,
      items: normalizedQuery && !section.title.toLowerCase().includes(normalizedQuery)
        ? section.items.filter(([name]) => name.toLowerCase().includes(normalizedQuery))
        : section.items,
    }))
    .filter((section) => section.items.length > 0);
  const resultCount = visibleSections.reduce((total, section) => total + section.items.length, 0);

  return (
    <main>
      <PageIntro eyebrow="The menu · More Than a Place. A Chapter." title={<>A table full<br /><em>of memories.</em></>} text="A nourishing bowl, a familiar favourite, or a taste that takes you back. Ask us what’s cooking today—and when the old favourites are making an appearance." image="/assets/chapter-cafe-interior.jpg" />
      <section className="menu-digital wrap">
        <div className="menu-digital-intro">
          <div><span className="eyebrow">The menu, made for the web</span><h2>Find an old favourite.<br /><em>Meet a new one.</em></h2></div>
          <p>Menu items and prices follow our latest menu. Message us to confirm what’s available today.</p>
        </div>
        <div className="menu-nostalgia-note">
          <div><span className="eyebrow">A taste that takes you home</span><h3>Bajra roti, makki di roti<br /><em>& churma, when they’re on.</em></h3></div>
          <WhatsAppLink className="button button-light" message="Hi! I’m hoping for a nostalgic meal. Are bajra roti, makki di roti, or churma available today or coming up soon?">Ask about today’s specials <Arrow diagonal /></WhatsAppLink>
        </div>
        <label className="menu-search">
          <span className="sr-only">Search the menu</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a dish…" />
          <span>{resultCount} {resultCount === 1 ? 'dish' : 'dishes'}</span>
        </label>
        <div className="menu-section-list">
          {visibleSections.map((section) => (
            <section className="digital-menu-section" key={section.title}>
              <div className="digital-menu-heading"><span>{String(section.chapter).padStart(2, '0')}</span><h2>{section.title}</h2><WhatsAppLink className="digital-menu-ask" message={`Hi! Could you please share today’s availability and prices for ${section.title}?`}>Ask about this chapter <Arrow diagonal /></WhatsAppLink></div>
              <ul className="digital-menu-items">
                {section.items.map(([name, price]) => (
                  <li key={name}>
                    <span>{name}</span>
                    {price ? <strong>₹{price}</strong> : <WhatsAppLink className="menu-price-ask" aria-label={`Ask on WhatsApp about the price of ${name}`} message={`Hi! What is the current price and availability of ${name}?`}>Ask us <Arrow diagonal /></WhatsAppLink>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {!visibleSections.length && <div className="menu-no-results"><p>No dishes match “{query}” just yet.</p><WhatsAppLink className="button button-dark" message={`Hi! I’m looking for ${query}. Could you let me know if you have it or suggest something similar?`}>Ask us on WhatsApp <Arrow diagonal /></WhatsAppLink></div>}
        </div>
        <div className="menu-download"><div><span className="eyebrow">Take the menu with you</span><h2>Keep the keepsake.</h2><p>Open or download the updated digital menu.</p></div><div className="menu-download-actions"><a className="button button-dark" href="/assets/chapter-menu-digital.pdf" target="_blank" rel="noreferrer">Open digital menu <Arrow diagonal /></a></div></div>
      </section>
      <section className="menu-cta"><div className="wrap menu-cta-inner"><p>Not sure what you’re craving?</p><WhatsAppLink message="Hi! I’m looking for something nostalgic. What’s cooking today, and when are bajra roti, makki di roti, or churma next available?">Tell us what you miss <Arrow diagonal /></WhatsAppLink></div></section>
    </main>
  );
}

function parseEventDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatEventDate(value, options) {
  const date = parseEventDate(value);
  return date ? new Intl.DateTimeFormat('en', options).format(date) : '';
}

function EventsPage() {
  const [filter, setFilter] = useState('All');
  const now = new Date();
  const dateKey = (date) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  const today = dateKey(now);
  const activeEvents = events.filter((event) => {
    const date = parseEventDate(event.date);
    return !date || dateKey(date) >= today;
  });
  const completedEvents = events.filter((event) => {
    const date = parseEventDate(event.date);
    return date && dateKey(date) < today;
  }).map((event) => ({ ...event, note: `${event.note} · ${formatEventDate(event.date, { day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' })}` }));
  const allArchive = [...completedEvents, ...eventArchive];
  const archive = allArchive.filter((event) => filter === 'All' || event.type === filter);
  const categories = ['All', ...new Set(allArchive.map((event) => event.type))];
  return (
    <main>
      <PageIntro className="events-intro" eyebrow="Events · Live from the rooftop" title={<>The night has<br /><em>its own plans.</em></>} text="Open mics, live music, fusion kirtan and DJ nights. Come for the sound, stay for the people." image="/assets/chapter-lounge-evening.jpg" imageAlt="Warm lounge seating and lanterns ready for an evening at The Himalayan Chapter" />
      <section className="section-pad wrap events-page">
        <div className="section-heading"><div><span className="eyebrow">The calendar</span><h2>Upcoming<br /><em>at the Chapter.</em></h2></div><span className="calendar-live"><i /> Dates confirmed by the Chapter</span></div>
        {activeEvents.length ? <div className="upcoming-grid">{activeEvents.map((event) => <article className={`upcoming-card${event.image ? '' : ' upcoming-card-no-image'}`} key={event.id}>{event.image ? <img src={event.image} alt={`${event.title} at The Himalayan Chapter`} /> : <div className="upcoming-event-mark"><span>ON THE ROOFTOP</span><strong>Good voices.<br />Long evenings.</strong><small>OPEN MIC · TAPOVAN</small></div>}<div className="upcoming-content"><span className="eyebrow">{event.type}{formatEventDate(event.date, { day: '2-digit', month: 'long' }) ? ` · ${formatEventDate(event.date, { day: '2-digit', month: 'long' })}` : ''}</span><h3>{event.title}</h3><p>{event.note}</p><div className="event-time"><span>Doors & music</span><strong>{event.time}</strong></div><WhatsAppLink message={event.bookingText}>Reserve your place <Arrow diagonal /></WhatsAppLink></div></article>)}</div> : <div className="no-events"><span className="no-events-star">✳</span><div><h3>Next dates are being written.</h3><p>Follow Instagram for the next announcement, or message us to ask what’s happening this week.</p><div className="hero-actions"><a className="button button-dark" href={instagramUrl} target="_blank" rel="noreferrer">Follow on Instagram <Arrow diagonal /></a><WhatsAppLink className="button button-outline" message="Hi! What live events are coming up at The Himalayan Chapter?">Ask about upcoming events</WhatsAppLink></div></div></div>}
        <section className="rooftop-films" aria-labelledby="rooftop-films-title"><div className="rooftop-films-heading"><div><span className="eyebrow">A little closer to the feeling</span><h2 id="rooftop-films-title">The rooftop,<br /><em>in motion.</em></h2></div><p>Press play for music, mountain air and the moments in between.</p></div><div className="rooftop-films-grid">{rooftopVideos.map((video) => <article className={`rooftop-film rooftop-film-${video.orientation}`} key={video.src}><div className="rooftop-film-frame"><video controls playsInline preload="metadata" aria-label={video.title}><source src={video.src} type="video/mp4" />Your browser does not support embedded videos.</video><span className="rooftop-film-tag">THE HIMALAYAN CHAPTER · TAPOVAN</span></div><div className="rooftop-film-copy"><h3>{video.title}</h3><p>{video.note}</p></div></article>)}</div></section>
        <div className="archive-heading"><div><span className="eyebrow">Good nights, remembered</span><h2>Past moments</h2></div><div className="filter-pills" role="group" aria-label="Filter past event photos">{categories.map((category) => <button key={category} className={filter === category ? 'selected' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div></div>
        <div className="archive-grid">{archive.map((event) => <article className={`archive-card ${event.artwork ? `archive-card-artwork archive-card-${event.artwork}` : ''}`} key={event.title}>{event.image ? <img src={event.image} alt={event.title} /> : <div className="archive-art" aria-hidden="true"><span>THE CHAPTER</span><i /><b>AFTER<br />HOURS</b><small>RISHIKESH · ROOFTOP</small></div>}<div><span>{event.type}</span><h3>{event.title}</h3><p>{event.note}</p></div></article>)}</div>
        <p className="events-source-note">More moments are shared on <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a>. New event dates are added here as they’re confirmed.</p>
      </section>
    </main>
  );
}

function StayPage() {
  const [selected, setSelected] = useState(0);
  const amenities = ['Air conditioning', 'Wi-Fi', 'Attached bathroom', 'Geyser', 'Television', 'Rooftop with live music'];
  const roomMessage = 'Hi! I would like to enquire about room availability at Nostalgia Co. Please share dates, room options and current rates.';
  return (
    <main>
      <PageIntro eyebrow="Stay at Nostalgia Co." title={<>A comfortable stay.<br /><em>A chapter upstairs.</em></>} text="Settle in, find your rhythm, and make the rooftop part of your stay in Tapovan." image={roomPhotos[selected]} />
      <section className="stay-detail section-pad wrap"><div className="stay-gallery"><button className="gallery-main" onClick={() => setSelected((selected + 1) % roomPhotos.length)} aria-label="Show next room photograph"><img src={roomPhotos[selected]} alt={`Guest room photograph ${selected + 1}`} /><span>View room photographs ↗</span></button><div className="gallery-thumbs">{roomPhotos.map((photo, index) => <button key={photo} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} aria-label={`Show room photograph ${index + 1}`}><img src={photo} alt="" /></button>)}</div></div><div className="stay-detail-copy"><span className="eyebrow">Make yourself at home</span><h2>Stay close<br /><em>to the feeling.</em></h2><p>A relaxed base for your time in Rishikesh, with the café and rooftop just part of the experience.</p><div className="stay-price stay-price-large">From <strong>₹2,500+</strong><span>per night</span></div><ul className="amenities">{amenities.map((amenity) => <li key={amenity}><span>✳</span>{amenity}</li>)}</ul><WhatsAppLink message={roomMessage}>Ask about rooms <Arrow diagonal /></WhatsAppLink><small className="quiet-note">Rates and availability are confirmed directly by WhatsApp.</small></div></section>
      <section className="stay-note"><div className="wrap"><span className="eyebrow">The best of both</span><h2>Sleep above the city.<br /><em>Wake into the Chapter.</em></h2><WhatsAppLink className="button button-light" message={roomMessage}>Plan your stay <Arrow diagonal /></WhatsAppLink></div></section>
    </main>
  );
}

function RetreatsPage() {
  const retreatMessage = 'Hi! I’m interested in the Rajas weekend retreat by The Himalayan Chapter. Please share available weekends, itinerary, inclusions, and booking details. I am travelling as: [solo / couple / group of __].';

  return (
    <main className="retreats-page">
      <section className="retreat-hero">
        <img className="retreat-hero-image" src="/assets/chapter-rooftop-panorama.jpg" alt="The Himalayan Chapter rooftop with the hills of Tapovan beyond" fetchPriority="high" />
        <div className="retreat-hero-shade" />
        <div className="retreat-hero-copy wrap">
          <span className="eyebrow">A weekend gathering · Rishikesh</span>
          <h1>Find your <em>Rajas.</em><br />Feel more alive.</h1>
          <p>Three days. Two nights. One Rishikesh weekend to get out, find your rhythm, and come back with stories.</p>
          <div className="retreat-hero-actions"><a className="button button-light" href="#retreat-prices">Find your place <Arrow /></a><a className="retreat-hero-text-link" href="#retreat-itinerary">See what the weekend holds <Arrow /></a></div>
          <span className="retreat-weekend-note">A new gathering, every weekend · Dates confirmed on enquiry</span>
        </div>
        <span className="retreat-hero-mark" aria-hidden="true">R</span>
      </section>

      <section className="retreat-partners wrap" aria-label="Retreat host">
        <div className="retreat-partner">
          <img src="/assets/chapter-brand-logo.png" alt="" />
          <span>Created and hosted by<br /><strong>The Himalayan Chapter</strong></span>
        </div>
      </section>

      <section className="retreat-meaning section-pad">
        <div className="wrap retreat-meaning-grid">
          <div><span className="eyebrow">The feeling behind the name</span><h2>Rajas means<br /><em>energy in motion.</em></h2></div>
          <div><p>In Sanskrit, <em>rajas</em> speaks to energy, movement and passion. This is a weekend made for feeling the place: new paths by day, shared plates, and nights that find their own rhythm.</p><p>Come solo, bring your person, or gather your favourite people. We’ll take care of the shape of the weekend together.</p></div>
        </div>
      </section>

      <section className="retreat-experiences section-pad wrap">
        <div className="section-heading"><div><span className="eyebrow">A little of everything, at a human pace</span><h2>Out in the day.<br /><em>Together after dark.</em></h2></div><p>Every weekend has its own character. Here’s the feeling we’re gathering, with the exact plan shared before you book.</p></div>
        <div className="retreat-experience-grid">
          <article className="retreat-experience-card"><span>01 · GO A LITTLE FURTHER</span><h3>Local trips,<br /><em>Rishikesh stories.</em></h3><p>See beautiful corners and local places with a team who knows the area. Stops and timings vary with each weekend.</p></article>
          <article className="retreat-experience-card"><span>02 · MAKE SPACE</span><h3>Move, soften,<br /><em>listen in.</em></h3><p>The weekend may include yoga, sound healing, a cacao gathering or ecstatic movement—shared in advance for your dates.</p></article>
          <article className="retreat-experience-card"><span>03 · LET THE NIGHT OPEN</span><h3>Music, meals<br /><em>& mountain air.</em></h3><p>Gather for food, rooftop live music and DJ nights. Easy company, open skies, and time for one more song.</p></article>
        </div>
        <p className="retreat-program-note">The experience is curated weekend by weekend. Activities, routes and timings can change; ask us for the confirmed plan before booking.</p>
      </section>

      <section className="retreat-itinerary-section" id="retreat-itinerary">
        <div className="wrap retreat-itinerary">
          <div className="retreat-itinerary-intro"><span className="eyebrow">Three days · Two nights</span><h2>Room for a plan.<br /><em>Space for a surprise.</em></h2><p>A sample rhythm, not a rigid timetable. Your confirmed weekend plan arrives before you travel.</p></div>
          <div className="retreat-itinerary-days">
            <article><span>DAY ONE · ARRIVE</span><div><h3>Settle in & meet your people.</h3><p>Ease into the weekend over food, a warm welcome and rooftop music.</p></div></article>
            <article><span>DAY TWO · EXPLORE</span><div><h3>Find your own Rishikesh.</h3><p>Take a local trip, share a meal, then choose from the day's planned movement, sound or stillness session.</p></div></article>
            <article><span>DAY THREE · TAKE IT WITH YOU</span><div><h3>A slower morning. A fuller heart.</h3><p>Close the gathering gently and head home with new places, new people and a story of your own.</p></div></article>
          </div>
        </div>
      </section>

      <section className="retreat-prices section-pad wrap" id="retreat-prices">
        <div className="section-heading"><div><span className="eyebrow">Your weekend, your people</span><h2>Find the way<br /><em>you want to come.</em></h2></div><p>Every weekend, three days and two nights. Message us for the confirmed itinerary and availability before making plans.</p></div>
        <div className="retreat-price-grid">
          <article><span>COME SOLO</span><strong>₹8,999</strong><small>per person</small><p>For one guest joining the weekend gathering.</p><WhatsAppLink message={`${retreatMessage}\n\nI’m enquiring about the solo rate: ₹8,999 per person.`}>Ask about a solo place <Arrow diagonal /></WhatsAppLink></article>
          <article className="retreat-price-featured"><span>BRING YOUR PERSON</span><strong>₹15,000</strong><small>per couple</small><p>A shared weekend for two, together in Rishikesh.</p><WhatsAppLink className="button button-light" message={`${retreatMessage}\n\nI’m enquiring about the couple rate: ₹15,000 per couple.`}>Ask about a couple place <Arrow diagonal /></WhatsAppLink></article>
          <article><span>GATHER YOUR GROUP</span><strong>Let's plan</strong><small>group rates on enquiry</small><p>Tell us your group size and weekend for a tailored quote.</p><WhatsAppLink message={`${retreatMessage}\n\nPlease share group rates. Our group size is: __.`}>Get a group quote <Arrow diagonal /></WhatsAppLink></article>
        </div>
        <p className="retreat-rate-note">Rates and inclusions are confirmed directly with the retreat team. Ask what is included in your chosen weekend before booking.</p>
      </section>

      <section className="retreat-final-cta">
        <div className="wrap retreat-final-inner"><div><span className="eyebrow">Your next weekend could feel different</span><h2>Bring your curiosity.<br /><em>We’ll meet you in Rishikesh.</em></h2><p>Send your dates and group size. We’ll share the next weekend's plan, current availability and confirmed inclusions.</p></div><WhatsAppLink className="button button-light" message={retreatMessage}>Ask about the next retreat <Arrow diagonal /></WhatsAppLink></div>
      </section>
    </main>
  );
}

function VolunteerPage() {
  const [form, setForm] = useState({ name: '', country: '', interest: 'Events', availability: '' });
  const [ready, setReady] = useState(false);
  const update = (key) => (event) => { setForm({ ...form, [key]: event.target.value }); setReady(false); };
  const submit = (event) => {
    event.preventDefault();
    setReady(true);
    const text = `Hi! I would love to volunteer with The Himalayan Chapter.\n\nName: ${form.name}\nCountry/city: ${form.country || 'Not provided'}\nI am interested in: ${form.interest}\nAvailability: ${form.availability || 'To discuss'}\n\nPlease share the next steps.`;
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };
  return (
    <main>
      <PageIntro eyebrow="Volunteer · Be part of the gathering" title={<>Bring your time.<br /><em>Find your people.</em></>} text="Help make the Chapter feel like a chapter: lend a hand at events, welcome guests and support the community that gathers here." />
      <section className="volunteer-section section-pad wrap"><div className="volunteer-intro"><span className="eyebrow">A small note, a real hello</span><h2>Come as you are.<br /><em>Start with a message.</em></h2><p>Tell us a little about yourself and what you’d like to help with. Your details stay in this form until you choose to send the message in WhatsApp.</p><div className="volunteer-values"><span><b>01</b> Events & live nights</span><span><b>02</b> Welcoming travellers</span><span><b>03</b> Community projects</span></div></div><form className="volunteer-form" onSubmit={submit}><label>Your name<input value={form.name} onChange={update('name')} required placeholder="How should we greet you?" /></label><label>Where are you visiting from?<input value={form.country} onChange={update('country')} placeholder="City or country" /></label><label>What would you like to help with?<select value={form.interest} onChange={update('interest')}><option>Events</option><option>Community activities</option><option>Welcoming guests</option><option>Something else</option></select></label><label>When are you available?<textarea value={form.availability} onChange={update('availability')} rows="3" placeholder="A date, a few hours, or your travel dates" /></label><button className="button button-dark" type="submit">Continue in WhatsApp <Arrow diagonal /></button>{ready && <p className="form-confirmation" role="status">Your message is ready in WhatsApp. Send it there to reach the team.</p>}<small>No application is submitted until you send the WhatsApp message.</small></form></section>
    </main>
  );
}

function VisitStrip() {
  return (
    <section className="visit-strip" aria-labelledby="visit-strip-title">
      <div className="wrap visit-strip-inner">
        <div className="visit-strip-copy">
          <span className="eyebrow">A little chapter is waiting in Tapovan</span>
          <h2 id="visit-strip-title">Come hungry.<br /><em>Leave with a story.</em></h2>
          <p>No grand plan needed. Just bring your appetite, your favourite people, and a little time to stay.</p>
          <div className="visit-strip-tags" aria-label="What you will find">
            <span>Old-time favourites</span><span>Rooftop evenings</span><span>Room for one more</span>
          </div>
        </div>
        <div className="visit-actions">
          <WhatsAppLink className="button button-light" message="Hi! I’d love to make a Chapter of my visit. Could you help me plan a good time to come and share today's timings?">Tell us when you’re coming <Arrow diagonal /></WhatsAppLink>
          <a className="visit-map-link" href={mapsUrl} target="_blank" rel="noreferrer">Find the café on the map <Arrow diagonal /></a>
          <span>Tapovan · Rishikesh · Uttarakhand</span>
        </div>
      </div>
    </section>
  );
}

function VisitPage() {
  return (
    <main>
      <PageIntro eyebrow="Visit · Find the Chapter" title={<>Your next table<br /><em>is in Tapovan.</em></>} text="Follow the feeling to Rishikesh. Message us for directions or today's hours, then come upstairs for the view." image="/assets/chapter-cafe-interior.jpg" />
      <VisitStrip />
      <section className="visit-weekend wrap">
        <img src="/assets/chapter-weekend-guide.jpg" alt="Illustrated weekend guide to the café, rooftop, mountain views, and nearby Tapovan sights" />
        <div><span className="eyebrow">Make a weekend of it</span><h2>Stay close to the vibes.<br /><em>Wake up by the mountains.</em></h2><p>Keep the rooftop, good food, and Tapovan’s river-and-mountain paths close by.</p><a className="button button-dark" href="/stay">Explore a stay <Arrow /></a></div>
      </section>
      <section className="visit-info section-pad wrap"><div><span className="eyebrow">The address</span><h2>Tapovan,<br /><em>Rishikesh.</em></h2><p>Uttarakhand, India</p><a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">Search Google Maps <Arrow diagonal /></a></div><div className="visit-details"><div><span>Hours</span><strong>Ask us for today's timings</strong><p>Opening times can change by season and event.</p></div><div><span>Reservations & orders</span><strong>WhatsApp · +91 83075 70870</strong><p>We’ll help with a table, order or directions.</p></div><div><span>Follow the story</span><strong><a href={instagramUrl} target="_blank" rel="noreferrer">@thehimalayanchapter_tapovan <Arrow diagonal /></a></strong><p>See the latest rooftop moments and event announcements.</p></div></div></section>
    </main>
  );
}

function ChapterIntro({ isExiting, isRooftopVisible, isRooftopExiting }) {
  return (
    <div className={`chapter-intro${isExiting ? ' is-exiting' : ''}${isRooftopVisible ? ' is-rooftop' : ''}${isRooftopExiting ? ' is-rooftop-exiting' : ''}`} role="status" aria-label="The Himalayan Chapter">
      <img className="chapter-intro-interior" src="/assets/chapter-cafe-postcard-04.jpg" alt="" />
      <div className="chapter-intro-halo" aria-hidden="true" />
      <div className="chapter-intro-mark" aria-hidden="true">
        <img className="chapter-intro-logo chapter-intro-logo-left" src="/assets/chapter-brand-logo.png" alt="" />
        <img className="chapter-intro-logo chapter-intro-logo-right" src="/assets/chapter-brand-logo.png" alt="" />
      </div>
      <span className="chapter-intro-caption">A café by Nostalgia Co. Collective</span>
      <img className="chapter-intro-rooftop" src="/assets/chapter-rooftop-intro.jpg" alt="" />
    </div>
  );
}

function App() {
  const path = useMemo(() => window.location.pathname.replace(/\/$/, '') || '/', []);
  const [isIntroVisible, setIsIntroVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isIntroExiting, setIsIntroExiting] = useState(false);
  const [isRooftopVisible, setIsRooftopVisible] = useState(false);
  const [isRooftopExiting, setIsRooftopExiting] = useState(false);
  useEffect(() => {
    if (!isIntroVisible) return undefined;
    const exitTimer = window.setTimeout(() => setIsIntroExiting(true), 1700);
    const rooftopTimer = window.setTimeout(() => setIsRooftopVisible(true), 5750);
    const rooftopExitTimer = window.setTimeout(() => setIsRooftopExiting(true), 9800);
    const removeTimer = window.setTimeout(() => setIsIntroVisible(false), 10900);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(rooftopTimer);
      window.clearTimeout(rooftopExitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isIntroVisible]);
  let Page = HomePage;
  if (path === '/menu') Page = MenuPage;
  else if (path === '/events') Page = EventsPage;
  else if (path === '/retreats') Page = RetreatsPage;
  else if (path === '/stay') Page = StayPage;
  else if (path === '/volunteer') Page = VolunteerPage;
  else if (path === '/visit') Page = VisitPage;
  return <><div className={`chapter-site-shell${isIntroVisible ? ' is-arriving' : ''}${isRooftopExiting ? ' is-landing' : ''}`} inert={isIntroVisible}><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content"><Page /></div><Footer /><div className="floating-contact-actions"><a className="floating-call" href={`tel:+${whatsappNumber}`} aria-label="Call The Himalayan Chapter at +91 83075 70870" title="Call The Himalayan Chapter"><CallIcon /></a><a className="floating-wa" href={waLink('Hi! I’m planning a visit to The Himalayan Chapter. Could you help me with today’s menu, nostalgic food specials, timings, or a reservation?')} target="_blank" rel="noreferrer" aria-label="Plan your visit with The Himalayan Chapter on WhatsApp"><WhatsAppIcon /><span>Chat on WhatsApp</span><Arrow diagonal /></a></div></div>{isIntroVisible && <ChapterIntro isExiting={isIntroExiting} isRooftopVisible={isRooftopVisible} isRooftopExiting={isRooftopExiting} />}</>;
}

export default App;

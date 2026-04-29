// The Scavo Family. Small enhancements only.
// Goals: reveal on scroll, year, smooth nav active state.

(() => {
  // Mark JS-enabled. Gates reveal animations (graceful fallback if JS fails)
  document.documentElement.classList.add('js');

  // Year stamp
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Reveal-on-scroll for sections + cards
  const revealTargets = [
    '.letter-body', '.letter-aside', '.section-title', '.section-lede',
    '.fact', '.profile-text', '.profile-photo', '.kids-photo', '.kids-text',
    '.bleed img', '.bleed-cap', '.story-body',
    '.story-photo', '.stability-body', '.stability-aside',
    '.home', '.ref', '.docs', '.contact-grid', '.contact-sign',
  ];
  const targets = document.querySelectorAll(revealTargets.join(','));
  targets.forEach(el => el.classList.add('reveal'));

  // Stagger groups
  document.querySelectorAll('.facts-grid, .people, .homes-grid, .refs-grid, .contact-grid, .press-row').forEach(g => {
    g.classList.add('reveal-stagger');
    Array.from(g.children).forEach(c => c.classList.remove('reveal'));
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('in'));
  }

  // Pause hero ken-burns when off-screen (saves battery on mobile)
  const heroImg = document.querySelector('.hero-art img');
  if (heroImg && 'IntersectionObserver' in window) {
    const ho = new IntersectionObserver(([entry]) => {
      heroImg.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    }, { threshold: 0.05 });
    ho.observe(heroImg);
  }

  // Pause marquee on hover for legibility
  document.querySelectorAll('.marquee').forEach(m => {
    const track = m.querySelector('.marquee-track');
    if (!track) return;
    m.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    m.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });
})();

(function () {
  document.documentElement.classList.add('js-ready');

  // 1. Staggered reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Interactive DORA Pillar & Statutory Clock Explorer
  const PILLARS = {
    risk: {
      title: 'ICT Risk Management Framework',
      desc: 'Board-owned governance backed by living asset inventories, RTO/RPO targets, immutable audit trails, and architectural separation of critical or important functions.',
      article: 'Articles 5 to 16',
      clock: 'Annual review + post-incident',
      control: 'Continuous CMDB + IaC drift checks',
      chapter: 'ICT Risk Governance'
    },
    incidents: {
      title: 'ICT Incident Classification & Reporting',
      desc: 'The regulatory clock starts at technical detection, not when General Counsel convenes. Engineering telemetry must trigger triage and statutory reporting automatically.',
      article: 'Articles 17 to 23',
      clock: '4h initial · 72h intermediate · 1mo final',
      control: 'Automated severity classifier + ledger',
      chapter: 'Incident Classification'
    },
    testing: {
      title: 'Digital Operational Resilience Testing & TLPT',
      desc: 'Move beyond annual tabletop checklists to live failover drills, vulnerability scans, and Threat-Led Penetration Testing (TIBER-EU) against live production systems.',
      article: 'Articles 24 to 27',
      clock: 'Annual tests · TLPT every 3 years',
      control: 'Production chaos + TIBER-EU red team',
      chapter: 'Resilience Testing'
    },
    thirdParty: {
      title: 'ICT Third-Party Risk & Register of Information',
      desc: 'Every cloud region, SaaS vendor, and fourth-party subcontractor supporting a critical function must be mapped into a machine-readable Register of Information with tested exit plans.',
      article: 'Articles 28 to 44',
      clock: 'Continuous RoI · ESA annual filing',
      control: 'Automated RoI export + exit drill',
      chapter: 'Third-Party & CTPP'
    }
  };

  const tabs = document.querySelectorAll('.dora-tab[data-pillar]');
  const elTitle = document.getElementById('dora-title');
  const elDesc = document.getElementById('dora-desc');
  const elArticle = document.getElementById('dora-article');
  const elClock = document.getElementById('dora-clock');
  const elControl = document.getElementById('dora-control');
  const elChapter = document.getElementById('dora-chapter');

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-pillar');
      const item = PILLARS[key];
      if (!item) return;
      tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === btn)));
      if (elTitle) elTitle.textContent = item.title;
      if (elDesc) elDesc.textContent = item.desc;
      if (elArticle) elArticle.textContent = item.article;
      if (elClock) elClock.textContent = item.clock;
      if (elControl) elControl.textContent = item.control;
      if (elChapter) elChapter.textContent = item.chapter;
    });
  });

  // 3. Early access form (mailto fallback)
  const form = document.getElementById('dora-access-form');
  const input = document.getElementById('dora-access-email');
  const status = document.getElementById('dora-access-status');
  if (form && input && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        status.textContent = 'Enter a valid email address to request the handbook.';
        input.focus();
        return;
      }
      const subject = encodeURIComponent("Early Access: Digital Operational Resilience Practitioner's Handbook");
      const body = encodeURIComponent(
        "Hi William,\n\nPlease add me to the early-access release list for the DORA Practitioner's Handbook.\n\nEmail: " + email + "\n"
      );
      status.textContent = 'Opening your mail client with your early-access request pre-filled.';
      window.location.href = 'mailto:william@powerworks.global?subject=' + subject + '&body=' + body;
    });
  }
})();

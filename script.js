const menu = document.querySelector('#menu');
const navigation = document.querySelector('nav');

menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.gallery-thumbs')?.removeAttribute('role');

// Reveal each section once, with a no-motion CSS fallback.
const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('show');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.08 });
document.querySelectorAll('section, article').forEach((element) => revealObserver.observe(element));

// Reading progress and active-section navigation.
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.prepend(progress);

const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
  });
}), { rootMargin: '-35% 0px -55%', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

// Theme preference is local to the visitor and survives reloads.
const header = document.querySelector('header');
const headerActions = document.createElement('div');
headerActions.className = 'header-actions';
const themeButton = document.createElement('button');
themeButton.className = 'icon-button';
themeButton.type = 'button';
themeButton.setAttribute('aria-label', 'Toggle navigation theme');
themeButton.title = 'Toggle navigation contrast';
themeButton.textContent = '◐';
header.insertBefore(headerActions, navigation);
headerActions.append(themeButton, menu);
const savedTheme = localStorage.getItem('portfolio-theme');
document.body.classList.toggle('light-mode', savedTheme === 'light');
themeButton.addEventListener('click', () => {
  const light = document.body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
});

// Project filters are derived from the actual case-study content.
const projectsSection = document.querySelector('#projects');
const projectGrid = projectsSection.querySelector('.projects');
const projectCards = [...projectGrid.querySelectorAll(':scope > article')];
const categories = ['cloud ai fullstack', 'cloud fullstack', 'ai fullstack'];
projectCards.forEach((card, index) => { card.dataset.category = categories[index]; });
const caseStudyPages = ['cloudops.html', 'deployforge.html', 'wealthcompass.html'];
projectCards.forEach((card, index) => {
  const link = document.createElement('a');
  link.className = 'case-study-link';
  link.href = caseStudyPages[index];
  link.textContent = 'Read case study →';
  card.append(link);
});

const filters = document.createElement('div');
filters.className = 'project-tools';
filters.setAttribute('aria-label', 'Filter projects');
filters.innerHTML = '<button class="active" data-filter="all">All work</button><button data-filter="cloud">Cloud & DevOps</button><button data-filter="ai">AI systems</button><button data-filter="fullstack">Full stack</button>';
const count = document.createElement('p');
count.className = 'project-count';
count.setAttribute('aria-live', 'polite');
projectsSection.insertBefore(filters, projectGrid);
projectsSection.insertBefore(count, projectGrid);

const applyFilter = (filter) => {
  let visible = 0;
  projectCards.forEach((card) => {
    const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
    card.classList.toggle('filtered-out', !show);
    if (show) visible += 1;
  });
  count.textContent = `Showing ${visible} of ${projectCards.length} projects`;
  filters.querySelectorAll('button').forEach((button) => button.classList.toggle('active', button.dataset.filter === filter));
};
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (button) applyFilter(button.dataset.filter);
});
applyFilter('all');

// Progressive disclosure keeps project cards scannable while preserving technical depth.
const scopes = [
  ['Authenticated REST API boundary', 'PostgreSQL persistence and Docker services', 'Incident triage and remediation flow', 'AI guidance grounded in operational context'],
  ['Terraform, YAML, JSON and Bicep parsing', 'Desired-state planning and drift detection', 'Policy, cost, graph and rollback workflows', 'Tests, migrations and frontend CI checks'],
  ['Local-first workspace with optional Supabase sync', 'Risk, portfolio, goal and mentor rule engines', 'Statement imports and transaction journal', 'Unit tests, input hardening and CI quality gate']
];
projectCards.forEach((card, index) => {
  const details = document.createElement('details');
  details.innerHTML = `<summary>Explore technical scope</summary><ul>${scopes[index].map((item) => `<li>${item}</li>`).join('')}</ul>`;
  card.insertBefore(details, card.querySelector('.outcomes'));
});

// Credential IDs can be copied without selecting text manually.
document.querySelectorAll('.credential-cards code').forEach((code) => {
  const button = document.createElement('button');
  button.className = 'copy-id';
  button.type = 'button';
  button.textContent = 'Copy ID';
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = 'Copied';
      window.setTimeout(() => { button.textContent = 'Copy ID'; }, 1600);
    } catch {
      button.textContent = 'Select ID';
    }
  });
  code.after(button);
});

// Keyboard affordances: P focuses projects, R downloads the résumé, Escape closes menus.
const help = document.createElement('div');
help.className = 'kbd-help';
help.textContent = 'P projects · R résumé';
document.body.append(help);
document.addEventListener('keydown', (event) => {
  if (/input|textarea/i.test(document.activeElement.tagName)) return;
  if (event.key.toLowerCase() === 'p') projectsSection.scrollIntoView({ behavior: 'smooth' });
  if (event.key.toLowerCase() === 'r') document.querySelector('a[download]').click();
  if (event.key === 'Escape') {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});

// Real project screenshots: thumbnail switching and a native, keyboard-friendly lightbox.
document.querySelectorAll('.project-gallery').forEach((gallery) => {
  const mainImage = gallery.querySelector('.gallery-main img');
  gallery.querySelector('.gallery-thumbs').addEventListener('click', (event) => {
    const thumb = event.target.closest('button[data-src]');
    if (!thumb) return;
    mainImage.src = thumb.dataset.src;
    mainImage.alt = thumb.dataset.alt;
    gallery.querySelectorAll('.gallery-thumbs button').forEach((button) => button.classList.toggle('active', button === thumb));
  });

  gallery.querySelector('.gallery-main').addEventListener('click', () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'gallery-dialog';
    dialog.innerHTML = `<button type="button" aria-label="Close screenshot">×</button><img src="${mainImage.src}" alt="${mainImage.alt}">`;
    document.body.append(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => dialog.remove());
    dialog.showModal();
  });
});

(() => {
  'use strict';

  const MEASUREMENT_ID = 'G-14ZYLEJ9HC';
  const CONSENT_KEY = 'portfolio-analytics-consent';
  const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
  const doNotTrack = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  let scriptLoaded = false;
  let consentGranted = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  const loadAnalytics = () => {
    if (isLocal || doNotTrack) return;
    consentGranted = true;
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('config', MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true
    });
    if (scriptLoaded) return;
    scriptLoaded = true;
    window.gtag('js', new Date());
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.referrerPolicy = 'strict-origin-when-cross-origin';
    document.head.append(script);
  };

  const track = (name, params = {}) => {
    if (!consentGranted) return;
    const safeParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => typeof value === 'string' && value.length <= 80)
    );
    window.gtag('event', name, safeParams);
  };

  const removeBanner = () => document.querySelector('.analytics-consent')?.remove();

  const saveChoice = (choice) => {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch (_) { /* Storage may be unavailable. */ }
    removeBanner();
    if (choice === 'granted') loadAnalytics();
    else {
      consentGranted = false;
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  };

  const showPreferences = () => {
    removeBanner();
    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'analytics-title');
    banner.innerHTML = '<div><strong id="analytics-title">Analytics preferences</strong><p>Allow anonymous Google Analytics measurements to help improve this portfolio? No advertising signals or form data are collected.</p></div><div class="consent-actions"><button type="button" data-consent="denied">Decline</button><button type="button" class="consent-accept" data-consent="granted">Allow analytics</button></div>';
    document.body.append(banner);
    banner.querySelectorAll('[data-consent]').forEach((button) => {
      button.addEventListener('click', () => saveChoice(button.dataset.consent));
    });
    banner.querySelector('button')?.focus();
  };

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-analytics-preferences]')) {
      event.preventDefault();
      showPreferences();
      return;
    }

    const target = event.target.closest('a, button[data-filter]');
    if (!target || !consentGranted) return;
    if (target.matches('button[data-filter]')) {
      track('project_filter', { filter_name: target.dataset.filter });
      return;
    }

    const href = target.getAttribute('href') || '';
    const label = target.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
    const pageContext = document.querySelector('.case-hero h1')?.textContent.trim() || 'Portfolio';

    if (target.hasAttribute('download') || href.endsWith('resume.pdf')) {
      track('resume_download', { page_context: pageContext });
    } else if (target.classList.contains('credential-link')) {
      track('credential_view', { credential_name: target.closest('article')?.querySelector('h3')?.textContent.trim() || label });
    } else if (target.classList.contains('case-study-link') || /(?:cloudops|deployforge|wealthcompass)\.html/.test(href)) {
      track('case_study_open', { project_name: label });
    } else if (/github\.com/.test(href)) {
      track('repository_visit', { link_label: label });
    } else if (/deployforge-eight\.vercel\.app/.test(href)) {
      track('live_demo_visit', { project_name: 'DeployForge' });
    } else if (href.startsWith('mailto:')) {
      track('contact_click', { page_context: pageContext });
    } else if (/linkedin\.com/.test(href)) {
      track('social_visit', { network: 'LinkedIn' });
    }
  });

  if (isLocal || doNotTrack) return;
  let savedChoice;
  try { savedChoice = localStorage.getItem(CONSENT_KEY); } catch (_) { /* Show preferences below. */ }
  if (savedChoice === 'granted') loadAnalytics();
  else if (savedChoice !== 'denied') showPreferences();
})();

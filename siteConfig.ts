const env = import.meta.env;

export const SITE_URL = env.VITE_SITE_URL || 'https://mustafa-seyhan-coaching.vercel.app/';

export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL || 'info@mustafaseyhancoaching.com';

export const SCHEDULING_URL = (env.VITE_SCHEDULING_URL || '').trim();

export const SCHEDULING_PROVIDER = SCHEDULING_URL.includes('calendly.com')
  ? 'Calendly'
  : SCHEDULING_URL.includes('cal.com')
    ? 'Cal.com'
    : 'Takvim';

export const HAS_SCHEDULING_LINK = SCHEDULING_URL.length > 0;

export const USE_CALENDLY_WIDGET = SCHEDULING_URL.includes('calendly.com');

export const SOCIAL_URLS = {
  linkedin: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/mustafaseyhan/',
  twitter: env.VITE_X_URL || 'https://x.com/mustafaseyhan',
  email: `mailto:${CONTACT_EMAIL}`,
};

// Google Analytics tracking functions

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url.href,
      page_title: document.title,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track downloads
export const trackDownload = (filename: string): void => {
  event({
    action: 'download',
    category: 'file',
    label: filename,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string): void => {
  event({
    action: 'click',
    category: 'social',
    label: platform,
  });
};

// Track contact form submissions
export const trackContactForm = (): void => {
  event({
    action: 'submit',
    category: 'form',
    label: 'contact',
  });
}; 
/**
 * Analytics and Tracking Integrations Helper for Autovate
 * Simply replace the placeholders with your own tracking IDs.
 */

// TODO: Replace with your actual Google Analytics 4 Measurement ID (e.g. 'G-XXXXXXXXXX')
export const GA_TRACKING_ID = '';

// TODO: Replace with your actual Facebook Pixel ID
export const FB_PIXEL_ID = '';

// TODO: Replace with your actual Hotjar Project ID
export const HOTJAR_ID = '';

/**
 * Initialize Google Analytics 4 (GA4)
 */
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.log('[Analytics] GA4: Tracking ID not set. Skipping load.');
    return;
  }
  
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
  `;
  document.head.appendChild(script2);
  console.log('[Analytics] GA4 Initialized successfully.');
};

/**
 * Initialize Facebook Pixel
 */
export const initPixel = () => {
  if (!FB_PIXEL_ID) {
    console.log('[Analytics] FB Pixel: Pixel ID not set. Skipping load.');
    return;
  }

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', FB_PIXEL_ID);
  fbq('track', 'PageView');
  /* eslint-enable */
  console.log('[Analytics] Facebook Pixel Initialized successfully.');
};

/**
 * Initialize Hotjar
 */
export const initHotjar = () => {
  if (!HOTJAR_ID) {
    console.log('[Analytics] Hotjar: Project ID not set. Skipping load.');
    return;
  }

  /* eslint-disable */
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  /* eslint-enable */
  console.log('[Analytics] Hotjar Initialized successfully.');
};

/**
 * Log pageviews dynamically on route change
 */
export const logPageView = (path) => {
  // Log to Google Analytics
  if (GA_TRACKING_ID && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }
  
  // Log to Facebook Pixel
  if (FB_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track custom conversion event (e.g. click Buy Now)
 */
export const trackEvent = (eventName, params = {}) => {
  console.log(`[Analytics] Track Event: ${eventName}`, params);
  
  if (GA_TRACKING_ID && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  if (FB_PIXEL_ID && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

import { useEffect } from 'react';

/**
 * Dynamically updates document head SEO tags.
 */
export const updateSEO = (title, description) => {
  if (title) {
    document.title = `${title} | Autovate — AI Automation Marketplace`;
  } else {
    document.title = "Autovate | Buy AI Automation Bots & Services";
  }
  
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }
    
    // Update OG description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }
  
  // Update OG title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && title) ogTitle.setAttribute('content', `${title} | Autovate`);
};

/**
 * React Component Wrapper for setting page-level SEO parameters.
 */
export function SEOPage({ title, description }) {
  useEffect(() => {
    updateSEO(title, description);
    window.scrollTo(0, 0); // Always scroll to top when page changes
  }, [title, description]);
  
  return null;
}

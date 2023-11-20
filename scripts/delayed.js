// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
function handleExternalLinks() {
  document.querySelectorAll('a:not(.interstitial a.button)').forEach(link => {
    if (link.host !== window.location.host && link.href !== '#back' && link.href !== '#redirect') {
      link.href = `${window.location.origin}/external-link-interstitial?redirect=${link.href}&back=${window.location.href}`
    }
  });
}

handleExternalLinks();
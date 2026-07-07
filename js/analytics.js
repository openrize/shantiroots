/**
 * Optional Google Analytics 4 loader.
 * Set SITE.analytics.gaId in config.js to enable (e.g. 'G-XXXXXXXXXX').
 */
import { SITE } from './config.js';

const gaId = SITE.analytics?.gaId;

if (gaId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true });
}

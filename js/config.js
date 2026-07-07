/**
 * Site-wide constants — keep contact and messaging consistent across pages.
 *
 * NOTE: contact.email uses the ShantiRoots brand domain. If the production
 * domain differs, update this single value and it propagates everywhere the
 * config is imported (shop, product cards, checkout, etc.).
 */
export const SITE = {
    brand: 'ShantiRoots',
    tagline: 'Modern Ayurvedic self-care rooted in tradition, crafted for everyday wellness.',
    contact: {
        email: 'hello@shantiroots.com',
        phoneDisplay: '(224) 377-9043',
        phoneTel: '+12243779043',
        cityLine: 'Chicago, IL',
    },
    // Compliance disclaimer shown on supplement/wellness pages.
    disclaimer:
        'These statements have not been evaluated by the Food and Drug Administration. ' +
        'ShantiRoots products are crafted for everyday self-care and are not intended to ' +
        'diagnose, treat, cure, or prevent any disease. Customer experience may vary. ' +
        'Consult a qualified healthcare professional before starting any new herbal product, ' +
        'especially if you are pregnant, nursing, taking medication, or managing a health condition.',
    // Set your Google Analytics 4 measurement ID to enable tracking (e.g. 'G-XXXXXXXXXX').
    analytics: {
        gaId: '',
    },
};

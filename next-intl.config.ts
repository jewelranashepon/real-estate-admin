// export const locales = ["en", "ar"] as const;

// i18n.ts
export const locales = ['en', 'ar']; // Add your supported locales
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

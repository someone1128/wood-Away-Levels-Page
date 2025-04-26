export const i18n = {
  defaultLocale: "en",
  locales: ["en","zh", "tw", "ja", "ko"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

import "server-only";
import type { Locale } from "@/i18n";

// 定义字典类型
type Dictionary = {
  [key: string]: any;
};

const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.default),
  zh: () => import("@/dictionaries/zh").then((module) => module.default),
  tw: () => import("@/dictionaries/tw").then((module) => module.default),
  ja: () => import("@/dictionaries/ja").then((module) => module.default),
  ko: () => import("@/dictionaries/ko").then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dictionary = dictionaries[locale as keyof typeof dictionaries];
  if (!dictionary) {
    throw new Error(`Dictionary not found for locale: ${locale}`);
  }
  return dictionary();
};

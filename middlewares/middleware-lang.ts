import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "@/i18n";
import Negotiator from "negotiator";
import { CustomMiddleware } from "./chain";

// 辅助函数：将浏览器语言代码映射到我们支持的语言代码
function mapBrowserLocaleToSupported(
  browserLocale: string,
): string | undefined {
  // 语言映射表
  const localeMap: Record<string, string> = {
    zh: "cn",
    "zh-CN": "cn",
    "zh-HK": "tw",
    "zh-TW": "tw",
    "zh-SG": "cn",
    ja: "ja",
    en: "en",
    de: "de",
    fr: "fr",
    ar: "ar",
    "ar-SA": "ar",
    "ar-AE": "ar",
    "ar-EG": "ar",
    "ko-KR": "ko",
    ko: "ko",
    it: "it",
    fa: "fa",
    es: "es",
    ru: "ru",
    "ru-RU": "ru",
  };

  // 先尝试完整匹配
  if (localeMap[browserLocale]) {
    return localeMap[browserLocale];
  }

  // 如果没有完整匹配，尝试匹配主语言代码
  const mainLang = browserLocale.split("-")[0];
  return localeMap[mainLang];
}

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // 获取浏览器语言列表
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // 遍历浏览器语言列表，找到第一个支持的语言
  for (const lang of languages) {
    const mappedLocale = mapBrowserLocaleToSupported(lang.toLowerCase());
    if (mappedLocale && i18n.locales.includes(mappedLocale as any)) {
      return mappedLocale;
    }
  }

  // 如果没有找到匹配的语言，返回默认语言（英语）
  return i18n.defaultLocale;
}

export default function withI18nMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const pathname = request.nextUrl.pathname;

    // 如果是 API 路径，直接返回
    if (pathname.startsWith("/api")) {
      return middleware(request, event, response);
    }

    // 检查路径是否已包含语言前缀
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    // 如果路径中没有语言前缀，进行重定向
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url,
        ),
      );
    }

    return middleware(request, event, response);
  };
}

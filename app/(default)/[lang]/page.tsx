import { Hero } from "@/components/sections/hero";
import { MediaCoverage } from "@/components/sections/media-coverage";
import { CompanyInfo } from "@/components/sections/company-info";
import AppDownload from "@/components/sections/app-download";
import { FAQ } from "@/components/sections/faq";
import { getDictionary } from "@/lib/dictionary";
import { i18n, type Locale } from "@/i18n";
import { ensureTrailingSlash } from "@/lib/utils";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      languages: Object.fromEntries(
        i18n.locales.map((locale: Locale) => [
          locale,
          ensureTrailingSlash(`/${locale}`),
        ])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const pageUrl = `${siteUrl}/${lang}`;
  const logoUrl = siteUrl + "/images/logo.webp"; // Use siteUrl for consistency
  const searchUrlTemplate = `${siteUrl}/${lang}/level?search={search_term_string}`;

  return (
    <>
      <Hero lang={lang} heroDict={dict.hero} />
      <MediaCoverage />
      <AppDownload />
      <CompanyInfo />
      <FAQ faqDict={dict.faq} />
    </>
  );
}

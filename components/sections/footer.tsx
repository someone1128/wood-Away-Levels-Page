import Link from "next/link";
import { Mail, Info } from "lucide-react";
import { type Locale } from "@/i18n";
import { langSwitcherData } from "@/components/common/LangSwitcherData";

export interface FooterDictionary {
  links: {
    about: string;
    privacy: string;
    contact: string;
    terms?: string;
    levels?: string;
    download?: string;
    blog?: string;
  };
  contact: {
    email: string;
  };
  copyright: string;
  disclaimer: string;
}

interface FooterProps {
  lang: Locale;
  footerDict: FooterDictionary;
}

export function Footer({ lang, footerDict }: FooterProps) {
  if (!footerDict) {
    console.error("Footer dictionary not provided!");
    return null;
  }

  return (
    <footer className=" py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerDict.links.levels && (
              <Link
                href={`/${lang}/level`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerDict.links.levels}
              </Link>
            )}
            {footerDict.links.download && (
              <Link
                href={`/${lang}/app`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerDict.links.download}
              </Link>
            )}
            {footerDict.links.blog && (
              <Link
                href={`/${lang}/blog`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerDict.links.blog}
              </Link>
            )}
            <Link
              href={`/${lang}/about`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {footerDict.links.about}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {footerDict.links.privacy}
            </Link>
            {footerDict.links.terms && (
              <Link
                href={`/${lang}/terms-of-service`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerDict.links.terms}
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              {footerDict.copyright}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0" />
              {footerDict.disclaimer}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4 border-t border-border/40 w-full max-w-5xl mx-auto">
            {langSwitcherData.map((item) => (
              <Link
                key={item.locale}
                href={`/${item.locale}`}
                className={`text-sm ${
                  lang === item.locale
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

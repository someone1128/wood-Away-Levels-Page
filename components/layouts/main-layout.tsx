"use client";

import { Header } from "@/components/sections/header";
import { Footer, FooterDictionary } from "@/components/sections/footer";
import { type Locale } from "@/i18n";

interface MainLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  footerDict: FooterDictionary;
}

export function MainLayout({ children, lang, footerDict }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} footerDict={footerDict} />
    </div>
  );
}

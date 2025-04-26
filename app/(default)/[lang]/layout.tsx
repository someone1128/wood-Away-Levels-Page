import { Josefin_Sans, Noto_Sans_SC } from "next/font/google";
import "@/app/globals.css";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n";
import DictionaryProvider from "@/context/DictionaryContext";
import { Providers } from "@/components/providers";
import { MainLayout } from "@/components/layouts/main-layout";
import AdContainer from "@/components/common/AdContainer";
import { Toaster } from "@/components/ui/toaster";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params?.lang);
  const isChinese = params.lang === "zh" || params.lang === "tw";
  return (
    <html lang={dictionary.locale} dir={"ltr"} suppressHydrationWarning>
      <body
        className={`${josefinSans.variable} ${notoSansSC.variable} ${"ltr"} ${
          isChinese ? "chinese-context font-sc" : "font-josefin"
        }`}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DictionaryProvider dictionary={dictionary}>
            <MainLayout lang={params.lang} footerDict={dictionary.footer}>
              {children}
            </MainLayout>
            <AdContainer />
          </DictionaryProvider>
        </Providers>
        <Toaster />
      </body>
      <GoogleAnalytics />
    </html>
  );
}

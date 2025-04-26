"use client";
import { Button } from "@/components/ui/button";
import { PlaySquare, Star, Apple } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { useParams } from "next/navigation";
import clsx from "clsx";

export default function AppDownload() {
  const dict = useDictionary();
  const params = useParams();
  const isRTL = params.locale === "ar" || params.locale === "fa";

  const downloadOptions = [
    {
      ...dict.appDownload.downloadOptions.googlePlay,
      icon: <PlaySquare className="h-8 w-8" />,
      link: dict.appDownload.downloadOptions.googlePlay.link,
    },
    // 只有当 App Store 链接存在时才添加
    ...(dict.appDownload.downloadOptions.appStore?.link
      ? [
          {
            ...dict.appDownload.downloadOptions.appStore,
            icon: <Apple className="h-8 w-8" />,
            link: dict.appDownload.downloadOptions.appStore.link,
          },
        ]
      : []),
  ];

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      id="app-download"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {dict.appDownload.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {dict.appDownload.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold">
              {dict.appDownload.stats.rating}
            </span>
          </div>
          <div className="text-lg text-muted-foreground">
            {dict.appDownload.stats.downloads}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {downloadOptions.map((option, index) => (
            <div key={index}>
              <h3>
                <Button
                  className={clsx(
                    "w-full h-14 transition-colors",
                    option.platform === "Google Play"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                  asChild
                >
                  <Link
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3"
                  >
                    <div className="text-white">{option.icon}</div>
                    <div className="text-white font-medium">
                      {option.description}
                    </div>
                  </Link>
                </Button>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

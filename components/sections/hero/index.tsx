import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Calendar,
  Youtube,
  Coffee,
  Download,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroSearch } from "./hero-search";
import { HeroImageWaterfall } from "./hero-image-waterfall";

interface HeroProps {
  lang: string;
  heroDict: {
    badge: string;
    title: string;
    description: string;
    stats: {
      guides: string;
      videoTutorials: string;
      quickSearch: string;
    };
    search: {
      placeholder: string;
      button: string;
      error: {
        invalid: string;
        notFound: string;
      };
    };
    buttons: {
      browseAll: string;
      downloadGame: string;
    };
    downloadCard: {
      title: string;
      description: string;
    };
    mainScreenshotAlt?: string;
    videoSection: {
      title: string;
      description: string;
    };
    screenshotAltTemplate?: string;
  };
}

export function Hero({ lang, heroDict }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute right-1/4 bottom-1/3 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse delay-700" />
        <div className="absolute left-1/3 top-1/3 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容区 */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                <Coffee className="h-6 w-6 text-primary" />
                <span className="font-semibold">{heroDict.badge}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {heroDict.title}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground">
              {heroDict.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{heroDict.stats.guides}</span>
              </div>
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-primary" />
                <span>{heroDict.stats.videoTutorials}</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <span>{heroDict.stats.quickSearch}</span>
              </div>
            </div>

            <HeroSearch lang={lang} searchDict={heroDict.search} />

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 hover:bg-primary/10"
                asChild
              >
                <Link href={`/${lang}/level`}>
                  {heroDict.buttons.browseAll}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                asChild
              >
                <Link href="/app">
                  {heroDict.buttons.downloadGame}{" "}
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">
                    {heroDict.downloadCard.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {heroDict.downloadCard.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧截图展示区 */}
          <div className="relative w-full max-w-xl mx-auto hidden lg:block">
            <div className="grid grid-cols-5 gap-4">
              {/* 主要截图 */}
              <div className="relative aspect-[9/16] col-span-3 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-2 shadow-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-full" />
                  <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-black">
                    <Image
                      src="/images/screenshot/unnamed1.webp"
                      alt={
                        heroDict.mainScreenshotAlt ||
                        "Wood Away main screenshot"
                      }
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* 标题和描述覆盖层 */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6 px-6">
                      <div className="relative z-10 space-y-2">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-primary transition-colors duration-300">
                          {heroDict.videoSection.title}
                        </h2>
                        <p className="text-sm text-white/80 drop-shadow-lg group-hover:text-white transition-opacity duration-300">
                          {heroDict.videoSection.description}
                        </p>
                        <div className="flex items-center gap-2 text-white/60 group-hover:text-primary transition-colors duration-300 text-sm mt-4">
                          <ArrowRight className="w-4 h-4" />
                          <span>{heroDict.buttons.browseAll}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧瀑布流截图和标题描述 */}
              <div className="col-span-2 flex gap-4">
                {/* 瀑布流截图 */}
                <div
                  className="relative overflow-hidden flex-1"
                  style={{ height: "600px" }}
                >
                  <HeroImageWaterfall
                    screenshotAltTemplate={heroDict.screenshotAltTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

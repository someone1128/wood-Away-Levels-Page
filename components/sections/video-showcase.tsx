"use client";

import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { useParams } from "next/navigation";
import clsx from "clsx";

export function VideoShowcase() {
  const dict = useDictionary();
  const params = useParams();
  const isRTL = params.locale === "ar" || params.locale === "fa";

  return (
    <section
      className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {dict.videoShowcase.title}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.videoShowcase.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src="https://www.youtube.com/embed/5WZ0pFfdrbQ"
                title={dict.videoShowcase.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="p-3">
              <div
                className={clsx(
                  "flex items-center gap-2 mb-1.5",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className="p-1 rounded-full bg-primary/10">
                  <Play className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3
                  className={clsx(
                    "text-base font-medium",
                    isRTL ? "text-right" : "text-left"
                  )}
                >
                  {dict.videoShowcase.video.title}
                </h3>
              </div>
              <p
                className={clsx(
                  "text-xs text-muted-foreground leading-relaxed",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                {dict.videoShowcase.video.description}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

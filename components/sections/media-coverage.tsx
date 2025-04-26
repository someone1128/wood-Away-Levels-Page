"use client";

import { Card } from "@/components/ui/card";
import { Coffee, Star, Sparkles, Timer, Trophy, Users } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { useParams } from "next/navigation";

const featureIcons = {
  Coffee,
  Timer,
  Trophy,
  Users,
  Star,
  Sparkles,
} as const;

export function MediaCoverage() {
  const dict = useDictionary();
  const params = useParams();
  const isRTL = params.locale === "ar" || params.locale === "fa";

  return (
    <section
      className="bg-gradient-to-b from-background to-primary/5"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {dict.mediaCoverage.title}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {dict.mediaCoverage.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.mediaCoverage.features.map((feature, index) => {
              const Icon = Object.values(featureIcons)[index];
              return (
                <div key={index}>
                  <Card className="p-6 h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                    <div className="flex flex-col h-full">
                      <div
                        className={`flex items-center gap-4 mb-4 ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                      </div>
                      <p
                        className={`text-muted-foreground flex-grow ${
                          isRTL ? "text-right" : ""
                        }`}
                      >
                        {feature.content}
                      </p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

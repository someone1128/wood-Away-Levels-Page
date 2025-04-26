"use client";

import { Card } from "@/components/ui/card";
import { Youtube, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";

const socialIcons = {
  youtube: Youtube,
  twitter: Twitter,
  instagram: Instagram,
  discord: MessageCircle,
};

type Section = {
  title: string;
  content?: string;
};

export function CompanyInfo() {
  const dict = useDictionary();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* 头部标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {dict.companyInfo.title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict.companyInfo.subtitle}
          </p>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {Object.entries(dict?.companyInfo?.stats || {}).map(
            ([key, value]) => {
              let label = "";
              try {
                switch (key) {
                  case "players":
                    label = dict?.common?.activePlayers || key;
                    break;
                  case "countries":
                    label = dict?.common?.countries || key;
                    break;
                  case "recipes":
                    label = dict?.common?.coffeeRecipes || key;
                    break;
                  case "rating":
                    label = dict?.common?.userRating || key;
                    break;
                  default:
                    label = key;
                }
              } catch (error) {
                console.error("Translation error:", error);
                label = key;
              }

              return (
                <Card
                  key={key}
                  className="p-6 text-center bg-card/50 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {value as string}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {label}
                  </div>
                </Card>
              );
            }
          )}
        </div>

        {/* 主要内容区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(dict.companyInfo.sections).map(
            ([key, section], index) => {
              const typedSection = section as Section;
              if (!typedSection.content) return null;

              return (
                <div key={key}>
                  <Card className="p-6 h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                    <h3 className="text-xl font-semibold mb-4">
                      {typedSection.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {typedSection.content}
                    </p>
                  </Card>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Clock, Send } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { cn } from "@/lib/utils";

export function HowToUse() {
  const dict = useDictionary();

  const icons = {
    0: MessageSquare,
    1: Send,
    2: Clock,
  } as const;

  return (
    <section className="">
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{dict.howToUse.title}</h2>
            <p className="text-xl text-muted-foreground">
              {dict.howToUse.subtitle}
            </p>
          </div>

          <div className="relative">
            {/* 背景连接线 */}
            <div className="absolute left-[50%] top-0 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden md:block" />

            <div className="space-y-12 relative">
              {dict.howToUse.steps.map((step, index) => {
                const Icon = icons[index as keyof typeof icons];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-8 opacity-0 animate-fade-in",
                      isEven ? "md:flex-row" : "md:flex-row-reverse",
                      "flex-col",
                    )}
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <div
                      className={cn(
                        "flex-1",
                        isEven ? "md:text-right" : "md:text-left",
                        "text-center",
                      )}
                    >
                      <Card className="inline-block p-6 hover:shadow-lg transition-shadow">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center",
                                !isEven && "md:order-last",
                              )}
                            >
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div
                              className={cn(
                                "flex-1",
                                !isEven && "md:text-right",
                              )}
                            >
                              <div className="text-sm text-muted-foreground">
                                {dict.howToUse.stepLabel} {index + 1}
                              </div>
                              <h3 className="text-xl font-semibold">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </Card>
                    </div>

                    {/* 时间线节点 */}
                    <div className="relative hidden md:block w-8 h-8">
                      <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary" />
                      <div
                        className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-primary/20 animate-ping"
                        style={{
                          animationDelay: `${index * 200 + 500}ms`,
                        }}
                      />
                    </div>

                    <div className="flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href={`/${dict.locale}/chat`}
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
            >
              {dict.howToUse.startButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

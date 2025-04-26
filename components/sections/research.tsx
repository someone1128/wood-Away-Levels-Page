"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Book, Brain, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";

const icons = {
  Brain,
  Book,
  FileText,
} as const;

export function Research() {
  const dict = useDictionary();

  return (
    <section className="">
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{dict.research.title}</h2>
            <p className="text-xl text-muted-foreground">
              {dict.research.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {dict.research.highlights.map((highlight, index) => {
              const Icon = icons[highlight.icon as keyof typeof icons];
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">{highlight.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{highlight.content}</p>
                </Card>
              );
            })}
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">
                {dict.research.paper.title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              {dict.research.paper.description}
            </p>
            <Button asChild>
              <Link
                href="https://github.com/deepseek-ai/DeepSeek-V3/blob/main/DeepSeek_V3.pdf"
                target="_blank"
                className="flex items-center"
              >
                {dict.research.paper.button}{" "}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

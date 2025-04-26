"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Github, Terminal, Globe } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";

export function GetStarted() {
  const dict = useDictionary();

  return (
    <section className="">
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {dict.getStarted.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="h-6 w-6" />
                {dict.getStarted.api.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {dict.getStarted.api.description}
              </p>
              <Button asChild>
                <Link href="https://platform.deepseek.com">
                  {dict.getStarted.api.button}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Github className="h-6 w-6" />
                {dict.getStarted.github.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {dict.getStarted.github.description}
              </p>
              <Button variant="outline" asChild>
                <Link href="https://github.com/deepseek-ai/DeepSeek-V3">
                  {dict.getStarted.github.button}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Globe className="h-6 w-6" />
              {dict.getStarted.chat.title}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {dict.getStarted.chat.description}
            </p>
            <Button size="lg" asChild>
              <Link href={`/${dict.locale}/chat`}>
                {dict.getStarted.chat.button}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

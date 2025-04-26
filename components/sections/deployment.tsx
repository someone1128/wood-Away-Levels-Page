"use client";

import { Card } from "@/components/ui/card";
import { Server, Cpu, Cloud, Terminal } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";

const icons = {
  local: Server,
  cloud: Cloud,
  hardware: Cpu,
} as const;

export function Deployment() {
  const dict = useDictionary();

  return (
    <section>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {dict.deployment.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.deployment.options.map((option, index) => (
              <Card key={index} className="p-6">
                {index === 0 && (
                  <Server className="h-12 w-12 text-primary mb-4" />
                )}
                {index === 1 && (
                  <Cloud className="h-12 w-12 text-primary mb-4" />
                )}
                {index === 2 && <Cpu className="h-12 w-12 text-primary mb-4" />}
                <h3 className="text-xl font-semibold mb-4">{option.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {option.description}
                </p>
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

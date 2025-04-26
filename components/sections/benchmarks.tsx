"use client";

import { Card } from "@/components/ui/card";
import { useDictionary } from "@/hooks/useDictionary";

type Category = "languageUnderstanding" | "coding" | "mathematics";
type MetricName =
  | "MMLU"
  | "BBH"
  | "DROP"
  | "HumanEval"
  | "MBPP"
  | "CRUXEval"
  | "GSM8K"
  | "MATH"
  | "CMath";

interface BenchmarkMetric {
  name: MetricName;
  score: string;
}

interface BenchmarkCategory {
  category: Category;
  metrics: BenchmarkMetric[];
}

const benchmarkData: BenchmarkCategory[] = [
  {
    category: "languageUnderstanding",
    metrics: [
      { name: "MMLU", score: "87.1%" },
      { name: "BBH", score: "87.5%" },
      { name: "DROP", score: "89.0%" },
    ],
  },
  {
    category: "coding",
    metrics: [
      { name: "HumanEval", score: "65.2%" },
      { name: "MBPP", score: "75.4%" },
      { name: "CRUXEval", score: "68.5%" },
    ],
  },
  {
    category: "mathematics",
    metrics: [
      { name: "GSM8K", score: "89.3%" },
      { name: "MATH", score: "61.6%" },
      { name: "CMath", score: "90.7%" },
    ],
  },
];

export function Benchmarks() {
  const dict = useDictionary();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dict.benchmarks.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benchmarkData.map((benchmark, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {dict.benchmarks.categories[benchmark.category]}
              </h3>
              <div className="space-y-4">
                {benchmark.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {dict.benchmarks.metrics[metric.name]}
                    </span>
                    <span className="font-semibold">{metric.score}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card } from "@/components/ui/card";

// Define props interface for the component
interface FAQProps {
  faqDict: {
    title: string;
    subtitle: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
}

export function FAQ({ faqDict }: FAQProps) {
  // Prepare FAQ data for JSON-LD using the passed prop
  const faqData = {
    "@context": "https://dreamyroom.net",
    "@type": "FAQPage",
    mainEntity: faqDict.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      {/* Add JSON-LD script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Use faqDict prop */}
            <h2 className="text-3xl font-bold mb-4">{faqDict.title}</h2>
            <p className="text-xl text-muted-foreground">{faqDict.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Use faqDict prop */}
            {faqDict.questions.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

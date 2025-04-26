import { Book, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  lang: string;
  subtitle?: string;
  date?: string;
}

export function BlogLayout({
  children,
  title,
  breadcrumbs,
  lang,
  subtitle,
  date,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen">
      <section className="relative pt-24 pb-6 ">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link
              href={`/${lang}/blog`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Book className="h-4 w-4" />
              <span>Blog</span>
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2 min-w-0">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors min-w-0"
                  >
                    <span className="truncate block">{item.label}</span>
                  </Link>
                ) : (
                  <span className="truncate block">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent pt-3">
                {title}
              </span>
            </h1>
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
            {date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={date}>{date}</time>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </section>
    </div>
  );
}

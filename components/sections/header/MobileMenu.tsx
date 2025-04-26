import { useDictionary } from "@/hooks/useDictionary";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const dict = useDictionary();

  if (!isOpen) return null;

  // 展平导航项，将子项提升到一级
  const flattenNavItems = dict.header.navItems.flatMap(item => {
    if (item.children) {
      return item.children;
    }
    return item;
  });

  return (
    <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm shadow-lg md:hidden z-[90]">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex flex-col items-center space-y-6">
          {flattenNavItems.map((item:any) => (
            <Link
              key={item.name}
              href={`/${dict.locale}${item.href}`}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

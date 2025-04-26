import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import { useState, useRef } from "react";

type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};

export function Navigation() {
  const dict = useDictionary();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300); // 300ms 的延迟
  };

  return (
      <nav className="hidden md:flex items-center gap-6 rtl:flex-row-reverse">
        {(dict.header.navItems as unknown as NavItem[])?.map((item: NavItem): JSX.Element => (
            <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
            >
              <Link
                  href={item.children ? "#" : `/${dict.locale}${item.href}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                    }
                  }}
              >
                {item.name}
              </Link>

              {item.children && hoveredItem === item.name && (
                  <div
                      className="absolute top-full left-0 mt-1 py-2 bg-background/95 backdrop-blur-sm shadow-lg rounded-md min-w-[200px] z-50"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                  >
                    {item.children.map((child: NavItem): JSX.Element => (
                        <Link
                            key={child.name}
                            href={`/${dict.locale}${child.href}`}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                        >
                          {child.name}
                        </Link>
                    ))}
                  </div>
              )}
            </div>
        ))}
      </nav>
  );
}

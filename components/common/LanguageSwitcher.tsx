"use client";
import Link from "next/link";
import Image from "next/image";
import { langSwitcherData } from "./LangSwitcherData";
import { useDictionary } from "@/hooks/useDictionary";
import { usePathname } from "next/navigation";

export default function LangSwitcher() {
  const dict = useDictionary();
  const pathname = usePathname();
  const currentLang = pathname?.split("/")[1];

  const currentLangData = langSwitcherData.find(
    (item) => item.locale === dict.locale,
  );

  const getNewPath = (locale: string) => {
    const segments = pathname?.split("/") || [];
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="group relative">
      <div className="peer flex w-full cursor-pointer items-center justify-between gap-3 rounded-full px-[14px] py-[3px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Image
            src={currentLangData?.icon || "/"}
            alt={currentLangData?.name || ""}
            width={18}
            height={18}
          />
          <span className="hidden sm:inline-block text-sm font-medium text-foreground whitespace-nowrap">
            {currentLangData?.name}
          </span>
        </div>

        <svg
          className="transition-transform duration-200 group-hover:rotate-180 flex-shrink-0"
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.29314 6.38394C4.49532 6.14807 4.85042 6.12075 5.0863 6.32293L9.97022 10.5092L14.8542 6.32293C15.09 6.12075 15.4451 6.14807 15.6473 6.38394C15.8495 6.61981 15.8222 6.97492 15.5863 7.17709L10.3363 11.6771C10.1256 11.8576 9.8148 11.8576 9.60415 11.6771L4.35415 7.17709C4.11828 6.97492 4.09097 6.61981 4.29314 6.38394Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="invisible absolute right-0 mt-2 w-48 rounded-lg border bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 peer-hover:visible hover:visible transition-all">
        <div className="py-1">
          {langSwitcherData
            .filter((item) => item.locale !== dict.locale)
            .map((item) => (
              <Link
                key={item.locale}
                href={getNewPath(item.locale)}
                className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                  item.locale === dict.locale
                    ? "bg-gray-50 dark:bg-gray-800"
                    : ""
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={18}
                  height={18}
                  className="inline-block"
                  style={{ height: "auto" }}
                />
                <span className="text-foreground">{item.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

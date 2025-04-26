import LangSwitcher from "@/components/common/LanguageSwitcher";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { MobileMenuButton } from "./MobileMenuButton";

interface HeaderActionsProps {
  navbarOpen: boolean;
  onNavbarToggle: () => void;
}

export function HeaderActions({ navbarOpen, onNavbarToggle }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <LangSwitcher />
        <ThemeSwitcher />
        <div className="relative z-[60] ml-1">
          <MobileMenuButton navbarOpen={navbarOpen} onClick={onNavbarToggle} />
        </div>
      </div>
    </div>
  );
}

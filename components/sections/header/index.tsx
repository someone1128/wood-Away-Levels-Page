"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { HeaderActions } from "./HeaderActions";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 bg-background/80 backdrop-blur-md shadow-sm",
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Navigation />
            <HeaderActions
              navbarOpen={navbarOpen}
              onNavbarToggle={navbarToggleHandler}
            />
          </div>
        </div>
      </div>
      <MobileMenu isOpen={navbarOpen} />
    </header>
  );
}

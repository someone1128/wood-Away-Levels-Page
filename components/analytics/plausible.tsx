"use client";

import Script from "next/script";

declare global {
  interface Window {
    plausible: any;
  }
}

export default function PlausibleAnalytics() {
  return (
    <>
      <Script
        defer
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        src={process.env.NEXT_PUBLIC_PLAUSIBLE_SRC}
      />
      <Script id="plausible-setup">
        {`
          window.plausible = window.plausible || function() { 
            (window.plausible.q = window.plausible.q || []).push(arguments) 
          }
        `}
      </Script>
    </>
  );
}

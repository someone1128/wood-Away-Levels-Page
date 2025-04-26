"use client";

import Script from "next/script";

export default function ConsentManager() {
  return (
    <Script
      src="https://cdn.consentmanager.net/delivery/autoblocking/37269101525d6.js"
      data-cmp-ab="1"
      data-cmp-host="c.delivery.consentmanager.net"
      data-cmp-cdn="cdn.consentmanager.net"
      data-cmp-codesrc="16"
      strategy="beforeInteractive"
    />
  );
} 
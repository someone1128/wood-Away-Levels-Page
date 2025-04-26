// dictionary-provider.tsx
"use client";
import React from "react";

export const DictionaryContext = React.createContext<any>(null);

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: any;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

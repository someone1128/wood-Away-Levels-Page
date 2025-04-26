import { DictionaryContext } from "@/context/DictionaryContext";
import { BaseError } from "@/lib/error";
import React from "react";

export function useDictionary() {
  const dictionary = React.useContext(DictionaryContext);
  if (dictionary === null) {
    throw new BaseError(
      "useDictionary hook must be used within DictionaryProvider",
    );
  }

  return dictionary;
}

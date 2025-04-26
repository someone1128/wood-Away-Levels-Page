"use server";
import GoogleAdsense from "../adsense";

interface AdContainerProps {
  slot?: string;
  className?: string;
}

export default async function AdContainer({ slot, className = "" }: AdContainerProps) {

  return (
    <div className="relative">
      <GoogleAdsense />
    </div>
  );
}

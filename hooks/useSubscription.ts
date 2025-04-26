import { useState } from "react";
import { useSession } from "next-auth/react";


export function useSubscription() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {

  };

  const isSubscribed = false

  return {
    isLoading,
    isSubscribed,
    handleSubscribe,
  };
}
